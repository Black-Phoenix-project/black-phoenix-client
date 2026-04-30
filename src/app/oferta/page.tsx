import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Публичная оферта — Black Phoenix",
};

export default function OfertaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-white mb-6">
        Публичная оферта
      </h1>
      <div className="space-y-4 text-white/60 text-sm leading-relaxed">
        <p>
          Настоящая публичная оферта определяет условия договора между компанией
          Black Phoenix и пользователями сайта.
        </p>
        <h2 className="text-white font-semibold text-base mt-6">
          1. Товары и цены
        </h2>
        <p>
          Все цены на сайте указаны в сумах. Компания оставляет за собой право
          изменять цены без предварительного уведомления.
        </p>
        <h2 className="text-white font-semibold text-base mt-6">
          2. Оформление заказа
        </h2>
        <p>
          Заказ принимается через форму на сайте. После подтверждения заказа наш
          менеджер свяжется с вами по указанному номеру телефона.
        </p>
        <h2 className="text-white font-semibold text-base mt-6">
          3. Доставка
        </h2>
        <p>
          Заказы доставляются в течение 1-3 рабочих дней. Условия доставки по
          Ташкенту согласовываются с менеджером.
        </p>
        <h2 className="text-white font-semibold text-base mt-6">
          4. Политика возврата
        </h2>
        <p>
          При возникновении вопросов по качеству товара свяжитесь с нашим
          менеджером. Условия возврата согласовываются отдельно.
        </p>
        <p className="text-white/30 text-xs mt-8">
          Последнее обновление: 2024 год
        </p>
      </div>
    </div>
  );
}
