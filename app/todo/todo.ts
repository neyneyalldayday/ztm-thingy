import fs from "fs";

const todosPath = "todos.json";

type Todo = {
  id: number;
  task: string;
};

function getTodos(): Todo[] {
  if (!fs.existsSync(todosPath)) {
    return [];
  }
  const data = fs.readFileSync(todosPath);
  return JSON.parse(data.toString()) as Todo[];
}

function listTodos(): void {
  const todos: Todo[] = getTodos();
  for (let i = 0; i < todos.length; i++) {
    console.log(`Todo: ${todos[i].id} --- ${todos[i].task}`);
  }
}

function saveTodos(todos: Todo[]): void {
  fs.writeFileSync(todosPath, JSON.stringify(todos));
}

function removeTodo(id: number): void {
  const todos: Todo[] = getTodos();
  const noteIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  });
  if (noteIndex === -1) {
    console.log(`could not find todo ${id}`);
    return;
  }
  const removedTodo = todos.splice(noteIndex, 1)[0];
  saveTodos(todos);
  console.log(`Removed todo ${removedTodo.id}:  ${removedTodo.task}`);
}

function addTodo(task: string): void {
  const todos: Todo[] = getTodos();
  const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
  todos.push({ id, task });
  saveTodos(todos);
  console.log(`added todo ${id}: ${task}`);
}

function cliInvalidOption(command: string): void {
  console.error(`invalid subcommand: ${command} dooood`);
}

function cli(): void {
  const subcommand = process.argv[2];
  const options = process.argv.slice(3);

  switch (subcommand) {
    case "--help":
      console.log("todo add TASK         add todo");
      console.log("todo done ID          complete a todo");
      console.log("todo list             list todo");
      break;
    case "add":
      if (options.length === 1) {
        addTodo(options[0]);
      } else {
        cliInvalidOption("add");
      }
      break;
    case "done":
      if (options.length === 1) {
        const id = parseInt(options[0]);
        if (isNaN(id)) {
          console.log("not a number gueyyyy");
        } else {
          removeTodo(id);
        }
      } else {
        cliInvalidOption("done");
      }
      break;
    case "list":
      if (options.length === 0) {
        listTodos();
      } else {
        cliInvalidOption("list");
      }
      break;
    default:
      console.log("invalid subcommand dooood");
  }
}

cli();
