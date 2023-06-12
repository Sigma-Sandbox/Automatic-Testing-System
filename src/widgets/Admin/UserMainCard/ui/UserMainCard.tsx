import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './UserMainCard.module.scss'
import { useFetching } from 'shared/lib/hooks/useFetching/useFetching'
import { getUserDecisionPath } from 'shared/const/queryPath'
import { containerCSS } from 'react-select/dist/declarations/src/components/containers'
import axios from 'axios'
import { TaskSet } from 'entities/Candidate/TestTask'
import { User } from 'entities/User'
import { useSelector } from 'react-redux'
import { getTotalScoreTaskSet } from 'entities/Admin/Users'
import { UserResultTaskSet } from './UserResultTaskSet/UserResultTaskSet'
import { Button, ColorButton, ThemeButton } from 'shared/ui/Button/Button'
import { ReactComponent as EditSvg } from 'shared/assets/icon/edit_main_card.svg'
import { ReactComponent as TelegramSvg } from 'shared/assets/icon/telegram.svg'
import { ReactComponent as WhatsAppSvg } from 'shared/assets/icon/whatsapp.svg'
import { UserResults } from './UserResults'

interface UserMainCardProps {
  className?: string
  user: User
  startEditCard: (user: User) => void
}

export const UserMainCard: React.FC<UserMainCardProps> = (props) => {
  const { className = '', user, startEditCard } = props

  const [loadCard, setLoadCard] = useState<boolean>(false)
  const [errorCard, setErrorCard] = useState<string | null>(null)
  useEffect(() => {
    if (user) {
      setLoadCard(true)
    }
  }, [user])

  return (
    <div className={classNames(cls.userMainCard, {}, [className])}>
      <div className={cls.cover}> </div>

      <div className={cls.links}>
        {/* <Button theme={ThemeButton.CLEAR} className={cls.link}>
          <TelegramSvg />
        </Button>
        <Button theme={ThemeButton.CLEAR} className={cls.link}>
          <WhatsAppSvg />
        </Button> */}
        <Button
          onClick={() => {
            user && startEditCard(user)
          }}
          theme={ThemeButton.CLEAR}
          color={ColorButton.TRANSPARENT}
          className={cls.editCard}
        >
          <EditSvg />
        </Button>
        <div className={classNames(cls.email)}>
          <a href={'mailto:' + user.email}>{user.email}</a>
        </div>
      </div>
      <div className={classNames(cls.about)}>
        <div className={classNames(cls.vacancies)}>
          <div className={classNames(cls.vacancy)}>
            {user.vacancies.map((vacancy) => vacancy.vacancyName).join(' | ')}
          </div>
        </div>

        <div className={classNames(cls.name)}>
          <span>{user.surname}</span>
          <span>{user.name}</span>
          {user.patronymic && <span>{user.patronymic}</span>}
        </div>
      </div>
      <div className={classNames(cls.tests)}>
        <div className={classNames(cls.testsTitle)}>Результаты тестов</div>
        {loadCard && <UserResults resultVacancies={user.vacancies} userId={user.id} />}
      </div>
    </div>
  )
}
