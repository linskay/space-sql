import React from 'react';
import { motion } from 'framer-motion';

export type HomeCard = {
  id: string;
  title: string;
  size: 'small' | 'medium' | 'large';
  content: React.ReactNode;
  color: string; // tailwind gradient classes
};

// Карточка-обёртка с hover-эффектами
const Card: React.FC<{ title: string; className?: string; children: React.ReactNode }>
  = ({ title, className = '', children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative rounded-2xl p-5 md:p-6 overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_10px_35px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_45px_rgba(138,43,226,0.35)] ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(1200px_circle_at_var(--x,50%)_var(--y,50%),rgba(138,43,226,0.15),transparent_40%)]" />
      <div className="relative z-10">
        <h3 className="font-space text-lg md:text-xl mb-3 text-white/90">{title}</h3>
        {children}
      </div>
    </motion.div>
  );
};

// Контентные мини-компоненты
export const NewsList: React.FC = () => {
  const news = [
    { id: 1, text: 'Запуск нового продукта 15 октября', date: '10.10.2023' },
    { id: 2, text: 'Обновление политики безопасности', date: '05.10.2023' },
    { id: 3, text: 'Хакатон Space SQL — регистрация открыта', date: '01.10.2023' },
  ];
  return (
    <ul className="space-y-3">
      {news.map((item) => (
        <li key={item.id} className="p-3 rounded-lg transition bg-white/0 hover:bg-white/10">
          <p className="font-medium">{item.text}</p>
          <span className="text-xs opacity-70">{item.date}</span>
        </li>
      ))}
    </ul>
  );
};

const RatingChart: React.FC = () => (
  <div className="text-sm text-white/80">ТОП-5 пользователей недели
    <ul className="mt-3 space-y-2">
      {['Алина', 'Олег', 'Кирилл', 'Мария', 'Иван'].map((n, i) => (
        <li key={n} className="flex items-center justify-between">
          <span>{i + 1}. {n}</span>
          <span className="text-cosmic-green">{(100 - i * 7)} очков</span>
        </li>
      ))}
    </ul>
  </div>
);

const TasksPreview: React.FC = () => (
  <ul className="text-sm space-y-2">
    {['Проверить pull request', 'Подготовить релиз', 'Ответить в поддержку'].map((t, i) => (
      <li key={i} className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cosmic-purple" />
        <span>{t}</span>
      </li>
    ))}
  </ul>
);

const AnalyticsMini: React.FC = () => (
  <div className="text-sm grid grid-cols-3 gap-3">
    {[
      { k: 'Пользователи', v: '12.4K' },
      { k: 'Активность', v: '87%' },
      { k: 'SQL-запросы', v: '1.2M' },
    ].map((m) => (
      <div key={m.k} className="rounded-lg bg-white/10 p-3 text-center">
        <div className="text-xs opacity-70">{m.k}</div>
        <div className="text-base font-semibold">{m.v}</div>
      </div>
    ))}
  </div>
);

const CalendarMini: React.FC = () => (
  <div className="text-sm">
    <div className="opacity-70 mb-1">Октябрь</div>
    <div className="grid grid-cols-7 gap-1 text-center text-xs opacity-90">
      {Array.from({ length: 28 }).map((_, i) => (
        <div key={i} className={`py-1 rounded ${[4, 11, 18].includes(i) ? 'bg-cosmic-purple/50' : 'bg-white/5'}`}>{i + 1}</div>
      ))}
    </div>
  </div>
);

const ChatMini: React.FC = () => (
  <div className="text-sm space-y-2">
    {[
      { u: 'Служба', m: 'Релиз перенесён на 18:00' },
      { u: 'DevOps', m: 'Кластер обновлён' },
    ].map((x, i) => (
      <div key={i} className="p-2 rounded bg-white/5">
        <span className="text-cosmic-blue">{x.u}:</span> {x.m}
      </div>
    ))}
  </div>
);

const gridClassesBySize: Record<HomeCard['size'], string> = {
  small: 'col-span-2 row-span-1',
  medium: 'col-span-2 row-span-2',
  large: 'col-span-4 row-span-2',
};

const colors = {
  bluePurple: 'bg-gradient-to-br from-[#2de2e6]/20 via-[#8a2be2]/20 to-[#24243e]/20',
  purplePink: 'bg-gradient-to-br from-[#8a2be2]/25 to-[#ff2e88]/20',
  cyanBlue: 'bg-gradient-to-br from-[#2de2e6]/25 to-[#00aaff]/20',
};

export const MainGrid: React.FC = () => {
  const cards: HomeCard[] = [
    { id: 'news', title: 'Новости', size: 'large', content: <NewsList />, color: colors.bluePurple },
    { id: 'ratings', title: 'Рейтинги', size: 'small', content: <RatingChart />, color: colors.purplePink },
    { id: 'tasks', title: 'Задачи', size: 'small', content: <TasksPreview />, color: colors.cyanBlue },
    { id: 'analytics', title: 'Аналитика', size: 'medium', content: <AnalyticsMini />, color: colors.bluePurple },
    { id: 'calendar', title: 'Календарь', size: 'small', content: <CalendarMini />, color: colors.purplePink },
    { id: 'chat', title: 'Чат', size: 'small', content: <ChatMini />, color: colors.cyanBlue },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 mt-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-4 grid-rows-2 md:grid-rows-3 gap-4 md:gap-6 auto-rows-[minmax(120px,auto)]
                   sm:grid-cols-2 sm:grid-rows-6"
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className={`${gridClassesBySize[card.size]} ${card.color} rounded-2xl`}
            style={{ position: 'relative' }}
          >
            <Card title={card.title}>
              {card.content}
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default MainGrid;


