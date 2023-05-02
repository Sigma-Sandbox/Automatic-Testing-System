import { TaskSetPack } from '../types/testTask'
import { ProgrammingLanguage } from 'core/enums'

export const testTaskDataExample: TaskSetPack = {
  id: 1,
  name: 'Java',
  timeLimits: 10800,
  description: '',
  data: [
    {
      description: 'Cool Task',
      timeLimits: 7200,
      name: 'Java padavan',
      id: 1,
      data: [
        {
          id: 1,
          description:
            'Напишите функцию, которая подсчитывает, сколькими различными способами вы можете внести сдачу на определенное количество денег, учитывая массив номиналов монет. Например, есть 3 способа дать сдачу на 4, если у вас есть монеты номиналом 1 и 2.',
          name: 'Сложная функция',
          complexityAssessment: 5,
          condition: [
            {language: ProgrammingLanguage.JavaScript, maxTime: 10, maxMemory: 256},
            {language: ProgrammingLanguage.Java, maxTime: 5, maxMemory: 128},
          ],
          examples:
            'countChange(4, [1,2]) // => 3 \ncountChange(10, [5,2,3]) // => 4 \ncountChange(11, [5,7]) //  => 0',
        },
        {
          id: 2,
          description:
            'Напишите функцию, которая подсчитывает, сколькими различными способами вы можете внести сдачу на определенное количество денег, учитывая массив номиналов монет. Например, есть 3 способа дать сдачу на 4, если у вас есть монеты номиналом 1 и 2.',
          name: 'Сложная функция',
          complexityAssessment: 5,
          condition: [
            {language: ProgrammingLanguage.Java, maxTime: 5, maxMemory: 128},
          ],
          examples:
            'countChange(4, [1,2]) // => 3 \ncountChange(10, [5,2,3]) // => 4 \ncountChange(11, [5,7]) //  => 0',
        },
        {
          name: 'Тест на знание JS',
          id: 3,
          timeLimits: 600,
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
          id: 4,
          timeLimits: 600,
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
      timeLimits: 1800,
      name: 'Soft skills',
      id: 2,
      data: []
    },
  ],
}
