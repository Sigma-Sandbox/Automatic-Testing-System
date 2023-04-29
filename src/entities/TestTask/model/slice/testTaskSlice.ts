import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TestTaskPack, TestTaskSchema} from '../types/testTask'
import {fetchTestTask} from '../services/fetchTestTask/getTestTask'

const initialState: TestTaskSchema = {
  isLoading: false,
  error: undefined,
  data: {
    // Mock data
    id: '1',
    name: 'Java',
    timeLimits: 'до 5 мая',
    description: '',
    data: [
      {
        description: 'Cool Task',
        taskCount: 6,
        timeLimits: '30 минут',
        name: 'Java padavan',
        id: '1',
        data: [
          {
            id: '1',
            description:
              'Напишите функцию, которая подсчитывает, сколькими различными способами вы можете внести сдачу на определенное количество денег, учитывая массив номиналов монет. Например, есть 3 способа дать сдачу на 4, если у вас есть монеты номиналом 1 и 2.',
            name: 'Сложная функция',
            complexityAssessment: 5,
            condition: ['Ограничение памяти 128 MB', 'Максимальное время выполнения 5 секунд'],
            examples:
              'countChange(4, [1,2]) // => 3 \ncountChange(10, [5,2,3]) // => 4 \ncountChange(11, [5,7]) //  => 0',
          },
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
          {
            name: 'Тест на знание JS',
            id: '3',
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
  },
}

export const testTaskSlice = createSlice({
  name: 'testTask',
  initialState,
  reducers: {
    setTestTaskData: (state, action: PayloadAction<TestTaskPack>) => {
      state.data = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestTask.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchTestTask.fulfilled, (state, action: PayloadAction<TestTaskPack>) => {
        state.isLoading = false
        // state.data = action.payload;
      })
      .addCase(fetchTestTask.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const {actions: testTaskActions} = testTaskSlice
export const {reducer: testTaskReducer} = testTaskSlice
