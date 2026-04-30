import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Black Phoenix",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-white mb-6">
        Политика конфиденциальности
      </h1>
      <div className="prose prose-invert prose-sm space-y-4 text-white/60">
        <p>
          Компания Black Phoenix уделяет большое внимание защите персональных
          данных пользователей.
        </p>
        <h2 className="text-white font-semibold text-base mt-6">
          Какие данные собираются?
        </h2>
        <p>
          При оформлении заказа собираются указанные вами номер телефона и имя.
          Эти данные используются только для связи с вами по вашему заказу.
        </p>
        <h2 className="text-white font-semibold text-base mt-6">
          Как используются данные?
        </h2>
        <p>
          Собранные данные не продаются и не передаются третьим лицам. Они
          используются только для выполнения заказа.
        </p>
        <h2 className="text-white font-semibold text-base mt-6">
          Cookie-файлы
        </h2>
        <p>
          Сайт использует cookie-файлы для повышения качества работы. Вы можете
          отключить cookie в настройках браузера.
        </p>
        <p className="text-white/30 text-xs mt-8">
          Последнее обновление: 2024 год
        </p>
      </div>
    </div>
  );
}
