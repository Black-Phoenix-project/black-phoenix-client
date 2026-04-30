import { Truck, UserCheck, ShieldCheck, Package2, PhoneCall } from "lucide-react";

export default function AboutSection() {
  const advantages = [
    {
      icon: Truck,
      title: "Быстрая доставка",
      desc: "Большие складские запасы позволяют нам выполнять заказы любого объема за 1-3 рабочих дня.",
    },
    {
      icon: UserCheck,
      title: "Индивидуальный подход",
      desc: "Менеджер может приехать на ваше предприятие с образцами тканей.",
    },
    {
      icon: ShieldCheck,
      title: "Гарантия качества",
      desc: "Наша спецодежда соответствует заявленным характеристикам: прочная, устойчивая к разрывам и удобная в уходе. Предоставляем сертификаты.",
    },
    {
      icon: Package2,
      title: "Нет минимального заказа",
      desc: "Вы можете купить как один товар, так и крупную партию.",
    },
  ];

  const categories = [
    "Летняя, зимняя и сезонная спецодежда",
    "Сигнальная форма и инвентарь со светоотражающими элементами",
    "Средства защиты: перчатки, очки, маски, каски, наколенники",
    "Спецобувь и сопутствующие товары",
  ];

  const services = [
    "Разработка инновационных тканей, пигментов и пропиток",
    "Проектирование формы с учетом отрасли, посадки и современных требований",
    "Производство",
    "Разработка защитных комплектов",
    "Нанесение логотипа и индивидуализация средств защиты",
  ];

  return (
    <section
      id="about"
      className="bg-brand-dark-2 border-y border-white/5 py-16 sm:py-20"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs text-warning/60 uppercase tracking-widest font-medium mb-2">
            Компания
          </p>
          <h2
            id="about-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white"
          >
            О нас
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          <div>
            <div className="glass-card rounded-2xl p-6 sm:p-8 h-full">
              <p className="text-white/70 leading-relaxed text-base mb-6">
                <span className="text-warning font-semibold">
                  &ldquo;Blackphoenix&rdquo;
                </span>{" "}
                производит и поставляет надежную рабочую одежду и средства
                индивидуальной защиты для предприятий разных отраслей.
              </p>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
                Наши услуги
              </h3>
              <ul className="space-y-2.5" aria-label="Список услуг">
                {services.map((service, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-white/60">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="glass-card rounded-2xl p-6 sm:p-8 h-full">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-1">
                Наш ассортимент
              </h3>
              <p className="text-sm text-white/50 mb-4">
                Мы предлагаем красивую и удобную форму для сотрудников сферы
                обслуживания. Также в ассортименте есть спецодежда для работы с
                химическими веществами, в загрязненной среде и в условиях
                повышенного риска.
              </p>
              <p className="text-xs text-white/30 uppercase tracking-wider mb-3">
                У нас можно заказать:
              </p>
              <ul className="space-y-2.5" aria-label="Список ассортимента">
                {categories.map((cat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-white/60">{cat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-center font-display text-xl sm:text-2xl font-bold text-white mb-6">
            Наши преимущества
          </h3>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            role="list"
            aria-label="Преимущества"
          >
            {advantages.map((adv, i) => (
              <div
                key={i}
                role="listitem"
                className="glass-card rounded-2xl p-5 border border-white/5 hover:border-warning/15 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center mb-3 group-hover:bg-warning/20 transition-colors">
                  <adv.icon
                    size={20}
                    className="text-warning"
                    aria-hidden="true"
                  />
                </div>
                <h4 className="font-semibold text-white text-sm mb-2">
                  {adv.title}
                </h4>
                <p className="text-xs text-white/50 leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 glass-card rounded-2xl p-6 sm:p-8 border border-warning/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
              <PhoneCall size={22} className="text-warning" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-base mb-1">
                Оформление заказа
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Выберите товар на сайте и правильно укажите номер телефона.
                Данные заказа поступят администраторам, и они скоро свяжутся с
                вами.
              </p>
              <p className="text-xs text-warning/70 mt-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-warning inline-block" />
                Важно: укажите корректный номер телефона - администраторы
                свяжутся именно по нему.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
