SELECT
	todos.id,
	todos.title,
	todos.created_at,
	todos.updated_at,
	todos.parent_todo,
	statuses.title

FROM
  todos
  JOIN todo_status ON 1=1
    AND todos.id = todo_status.todo_id
  JOIN statuses ON 1=1
    AND todo_status.status_id = statuses.id

WHERE 1=1
  AND statuses.title = 'pending';
