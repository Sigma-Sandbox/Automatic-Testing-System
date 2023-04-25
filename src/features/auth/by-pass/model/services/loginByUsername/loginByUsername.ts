import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {testTaskActions} from 'entities/TestTask/model/slice/testTaskSlice'
import {User, UserRole, userActions} from 'entities/User'

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, {rejectValue: string}>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    try {
      const response = await axios.get<User>('https://jsonplaceholder.typicode.com/users')

      // if (!response.data) {
      //     throw new Error();
      // }

      // Mock data
      thunkAPI.dispatch(
        userActions.setAuthData({
          id: '0',
          username: 'gigpopotam',
          firstname: 'Иван',
          lastname: 'Иванов',
          roles: UserRole.USER,
          position: 'Java-разработчик',
        })
      )
      thunkAPI.dispatch(
        testTaskActions.setTestTaskData({
          id: '1',
          name: 'Java',
          timeLimits: 'до 5 мая',
          description: '',
          data: [
            {
              description: 'Cool Task',
              taskCount: 6,
              timeLimits: '24 часа',
              name: 'Java padavan',
              id: '1',
              data: [
                {id: '1', description: 'Написать очень сложную функцию', name: 'Сложная фнукция'},
                {
                  name: 'Тест на знание JS',
                  id: '2',
                  timeLimits: '10:00',
                  taskCount: 5,
                  testItem: [
                    {
                      id: 1,
                      description: 'Какие существуют типы данных в JavaScript?',
                      rightAns: ['Boolean', 'String', 'Number'],
                      wrongAns: ['Function', 'Class'],
                    },
                    {
                      id: 2,
                      description: 'Какие существуют типы данных в Java?',
                      rightAns: ['byte', 'short', 'int'],
                      wrongAns: ['char', 'boolean'],
                    },
                    {
                      id: 3,
                      description: 'Как называется код между фигурными скобками?',
                      rightAns: ['функция', 'секция', 'тело', 'блок'],
                      wrongAns: ['function', 'int'],
                    },
                    {
                      id: 4,
                      description: 'В чем разница между char и Character?',
                      rightAns: ['нет разницы, они оба примитивные типы'],
                      wrongAns: ['char является классом, а Character примитивным типом', 'нет разницы, они оба классы'],
                    },
                    {
                      id: 5,
                      description: 'Какие существуют типы данных в JavaScript?',
                      rightAns: ['Boolean'],
                      wrongAns: ['Function', 'Class', 'String', 'Number'],
                    },
                  ],
                },
              ],
            },
            {
              description: 'Cool Task',
              taskCount: 6,
              timeLimits: '23 аперля 2023',
              name: 'Soft skills',
              id: '2',
            },
          ],
        })
      )

      return response.data
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue('Проверьте правильность введеных данных')
    }
  }
)
