# Автоматическая система тестирования

## Запуск

>`npm start`

Одновременно запустятся Backend и Frontend
В браузере можно перейти по [http://localhost:3000](http://localhost:3000)

## Codestyle
1. Кавычки одинарные
2. Точки с запятой не ставим
3. Слово public в классах не ставим
4. Методы классов - обычные функции, а не стрелки. Допускается использовать стрелки, когда нужно сохранить контекст метода
5. Тип возвращаемого значения пишем всегда, даже если это `void`
6. Функции, возвращающие разметку React - стрелочные
7. Всегда используем `const` кроме случаев, когда необходимо использовать `let`
8. Поля классов типизируем всегда
9. Стараемся использовать как можно больше интерфейсов и перечислений, а не простыни параметров и массивы
10. В интерфейсах не ставим запятые
11. Помещаем переменные в строку при помощи `${}` вместо конкатенации через плюс
12. Ширина Tab - 2 пробела

## Пример вызовов методов БД

```javascript
const postUserSolution = async (solution: UserSolution) => {
  fetch('api/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(solution),
  })
  
  fetch('api/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({...solution, id: 2}),
  })
  
  fetch('api/delete/user_solution', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({id: 4}),
  })
  
  const conditions: GetUserSolutionConditions = {
    id: 1,
    userId: 1
  }
  const response = await fetch('api/get/user_solution', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(conditions),
  })
  const body: UserSolution[] = await response.json()
  console.log(body)
}
```

#### Project designed by [FeatureSliced](https://feature-sliced.design/)