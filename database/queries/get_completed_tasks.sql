select
	todos.id,
	todos.title,
	todos.created_at,
	todos.updated_at,
	todos.parent_todo,
	statuses.title
from
  todos
  join todo_status on 1=1
    and todos.id = todo_status.todo_id
  join statuses on 1=1
    and todo_status.status_id = statuses.id
where 1=1
  and statuses.title = 'completed'
