import {TaskSetPack} from '../types/testTask'
import {ProgrammingLanguage} from 'core/enums'

export const testTaskDataExample: TaskSetPack = {
  id: 1,
  name: 'Java',
  timeLimits: 10800,
  description: '',
  numOfTry: 1,
  data: [
    {
      description: 'Cool Task',
      timeLimits: 7200,
      name: 'Java padavan',
      id: 1,
      creator: 'p',
      timeOfCreation: 1233,
      language: [ProgrammingLanguage.JavaScript],
      testTasks: [
        {
          name: 'Тест на знание JS',
          id: 3,
          execTime: 600,
          description: 'blalbal',
          questions: [
            {
              id: 1,
              description: 'Какие существуют типы данных в JavaScript?',
              points: 1,
              wrongAnswers: ['Boolean', 'String', 'Number'],
              correctAnswers: ['Function', 'Class'],
            },
            {
              id: 2,
              points: 1,
              description: 'Какие существуют типы данных в Java?',
              correctAnswers: ['byte', 'short', 'int'],
              wrongAnswers: ['char', 'boolean'],
            },
            {
              id: 3,
              points: 1,
              description: 'Как называется код между фигурными скобками?',
              correctAnswers: ['функция', 'секция', 'тело', 'блок'],
              wrongAnswers: ['function', 'int'],
            },
            {
              id: 4,
              points: 1,
              description: 'В чем разница между char и Character?',
              correctAnswers: ['нет разницы, они оба примитивные типы'],
              wrongAnswers: [
                'char является классом, а Character примитивным типом',
                'нет разницы, они оба классы',
              ],
            },
            {
              id: 5,
              points: 1,
              description: 'Какие существуют типы данных в JavaScript?',
              correctAnswers: ['Boolean'],
              wrongAnswers: ['Function', 'Class', 'String', 'Number'],
            },
          ],
        },
      ],
      progTasks: [
        {
          id: 1,
          description:
            'Напишите функцию, которая подсчитывает, сколькими различными способами вы можете внести сдачу на определенное количество денег, учитывая массив номиналов монет. Например, есть 3 способа дать сдачу на 4, если у вас есть монеты номиналом 1 и 2.',
          name: 'Сложная функция',
          complexityAssessment: 5,
          conditions: [
            {language: ProgrammingLanguage.JavaScript, maxTime: 10, maxMemory: 256, codeExample: 'function reverse(n) {\n\t//(4, [1,2]) => 3 \n\t//(10, [5,2,3]) => 4 \n\t//(11, [5,7]) => 0\n\tconst result = 0\n\treturn result\n}', autoTests: "function result(input, answer) {\nconst res = reverse(input)\nif (res !== answer) {\nthrow new Error(`Input: ${input}, Current Output: ${res}, Expected Output: ${answer}`)\n}\n}\n\nresult(5, [5, 4, 3, 2, 1])\nresult(4, [4, 3, 2, 1])\nresult(3, [3, 2, 1])\nresult(2, [2, 1])\n\nconsole.log(`All tests done!`)"},
            {language: ProgrammingLanguage.Java, maxTime: 5, maxMemory: 128, codeExample: 'public class Sequence {\n\tpublic static int[] reverse(int n) {\n\t\t//your code\n\t\treturn new int[];\n\t}\n}', autoTests: "class Test {\npublic static boolean result(int n, int[] trueResult) {\nSequence tmp = new Sequence();\nint[] res = tmp.reverse(n);\nif (res != trueResult) {\nthrow new Error(\"Input: \" + n + \"Current Output: \" + res + \"Expected Output: \" + trueResult);\n}\n}\n}\n\nclass Main {\npublic static void main(String[] args) {\nTest test = new Test();\ntest.result(5, {5, 4, 3, 2, 1});\ntest.result(4, {4, 3, 2, 1});\ntest.result(3, {3, 2, 1});\ntest.result(2, {2, 1});\nSystem.out.println(\"All tests done!\");\n}\n}"},
          ],
        },
      ],
    },
    {
      description: 'Cool Task',
      timeLimits: 1800,
      name: 'Soft skills',
      id: 2,
      creator: 'p',
      timeOfCreation: 1233,
      language: [ProgrammingLanguage.JavaScript],
      testTasks: [
        {
          name: 'Тест на знание JS',
          id: 3,
          execTime: 600,
          description: 'blalbal',
          questions: [
            {
              id: 1,
              description: 'Какие существуют типы данных в JavaScript?',
              points: 1,
              wrongAnswers: ['Boolean', 'String', 'Number'],
              correctAnswers: ['Function', 'Class'],
            },
            {
              id: 2,
              points: 1,
              description: 'Какие существуют типы данных в Java?',
              correctAnswers: ['byte', 'short', 'int'],
              wrongAnswers: ['char', 'boolean'],
            },
            {
              id: 3,
              points: 1,
              description: 'Как называется код между фигурными скобками?',
              correctAnswers: ['функция', 'секция', 'тело', 'блок'],
              wrongAnswers: ['function', 'int'],
            },
            {
              id: 4,
              points: 1,
              description: 'В чем разница между char и Character?',
              correctAnswers: ['нет разницы, они оба примитивные типы'],
              wrongAnswers: [
                'char является классом, а Character примитивным типом',
                'нет разницы, они оба классы',
              ],
            },
            {
              id: 5,
              points: 1,
              description: 'Какие существуют типы данных в JavaScript?',
              correctAnswers: ['Boolean'],
              wrongAnswers: ['Function', 'Class', 'String', 'Number'],
            },
          ],
        },
      ],
      progTasks: [
        {
          id: 1,
          description:
            'Напишите функцию, которая подсчитывает, сколькими различными способами вы можете внести сдачу на определенное количество денег, учитывая массив номиналов монет. Например, есть 3 способа дать сдачу на 4, если у вас есть монеты номиналом 1 и 2.',
          name: 'Сложная функция',
          complexityAssessment: 5,
          conditions: [
            {language: ProgrammingLanguage.JavaScript, maxTime: 10, maxMemory: 256, codeExample: 'function reverse(n) {\n//(4, [1,2]) => 3 \n//(10, [5,2,3]) => 4 \n//(11, [5,7]) => 0\nconst result = 0\nreturn result\n}', autoTests: "function result(input, answer) {\nconst res = reverse(input)\nif (res !== answer) {\nthrow new Error(`Input: ${input}, Current Output: ${res}, Expected Output: ${answer}`)\n}\n}\n\nresult(5, [5, 4, 3, 2, 1])\nresult(4, [4, 3, 2, 1])\nresult(3, [3, 2, 1])\nresult(2, [2, 1])\n\nconsole.log(`All tests done!`)"},
            {language: ProgrammingLanguage.Java, maxTime: 5, maxMemory: 128, codeExample: 'public class Sequence {\npublic static int[] reverse(int n) {\n//your code\nreturn new int[];\n}\n}', autoTests: "class Test {\npublic static boolean result(int n, int[] trueResult) {\nSequence tmp = new Sequence();\nint[] res = tmp.reverse(n);\nif (res != trueResult) {\nthrow new Error(\"Input: \" + n + \"Current Output: \" + res + \"Expected Output: \" + trueResult);\n}\n}\n}\n\nclass Main {\npublic static void main(String[] args) {\nTest test = new Test();\ntest.result(5, {5, 4, 3, 2, 1});\ntest.result(4, {4, 3, 2, 1});\ntest.result(3, {3, 2, 1});\ntest.result(2, {2, 1});\nSystem.out.println(\"All tests done!\");\n}\n}"},
          ],
        },
      ],
    },
  ],
}
