import axios from 'axios'
import { VacancyTest } from 'entities/Candidate/TestTask/model/types/testTask'
import { getVacanciesPath } from 'shared/const/queryPath'

export const fetchVacancyTaskSet = async (testTask: { id: number }) => {
  try {
    const response = await axios.post<VacancyTest[]>(getVacanciesPath, { id: testTask.id })

    if (!response.data) {
      throw new Error()
    }
    return response.data[0].taskSets
  } catch (e) {
    console.log(e)
    return console.log('get testtask Fail')
  }
}
