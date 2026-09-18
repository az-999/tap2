# Задачи в админке

Таблица 'task_list'
- id
- name
- price
- type
- link
- type - тип задания (телеграм, )
- group - идентификатор группы
- icon
- status
- checker
- checker_options
- sort_index
- dead_line_at - время после которого задание снимается и переходит в неактивный статус 
- limit - лимит после которого задание снимается и переходит в неактивный статус

Лимит на задания
`task_list_count`