from flask import Flask
from flask_graphql import GraphQLView
import graphene
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = [
]
class Query(graphene.ObjectType):
    tasks = graphene.List(Task)

    def resolve_tasks(self, info):
        return tasks
class Task(graphene.ObjectType):
    id = graphene.Int()
    title = graphene.String()
    description = graphene.String()
    when = graphene.String()

class TaskInput(graphene.InputObjectType):
    title = graphene.String()
    description = graphene.String()
    when = graphene.String()



class AddTask(graphene.Mutation):
    class Arguments:
        input = TaskInput(required=True)

    task = graphene.Field(lambda: Task)

    def mutate(self, info, input):
        new_task = {'id': len(tasks) + 1, 'title': input.title, 'description': input.description, 'when': input.when}
        tasks.append(new_task)
        return AddTask(task=new_task)

class UpdateTask(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = TaskInput(required=True)

    task = graphene.Field(lambda: Task)

    def mutate(self, info, id, input):
        for task in tasks:
            if task['id'] == id:
                task['title'] = input.title
                task['description'] = input.description
                task['when'] = input.when
                return UpdateTask(task=task)
        return None

class DeleteTask(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        global tasks
        tasks = [task for task in tasks if task['id'] != id]
        return DeleteTask(success=True)

class Mutation(graphene.ObjectType):
    add_task = AddTask.Field()
    update_task = UpdateTask.Field()
    delete_task = DeleteTask.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

if __name__ == '__main__':
    app.run(debug=True)
