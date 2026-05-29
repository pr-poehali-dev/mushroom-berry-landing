import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/071e3c4d-3264-4929-b5b1-c82e7521c464/files/2b6e7ac3-f8ba-4d81-84bb-62c9d6ff8be2.jpg";
const LOGO = "https://cdn.poehali.dev/projects/071e3c4d-3264-4929-b5b1-c82e7521c464/bucket/44e33e96-5d42-470d-a661-982345dfbd3b.jpg";

const products = [
  {
    id: 1,
    name: "Варенье из чёрных лисичек",
    desc: "Редкий деликатес — бережно собранные в кировских лесах лисички, томлёные по авторскому рецепту",
    price: 799,
    emoji: "🍄",
    tag: "Хит продаж",
    image: "https://cdn.poehali.dev/projects/071e3c4d-3264-4929-b5b1-c82e7521c464/bucket/f341fb6c-1b86-4b50-b89b-b8ed7cbf9aa7.jpg",
  },
  {
    id: 2,
    name: "Масло из белого гриба",
    desc: "Ароматное масло холодного настоя с белыми грибами. Превращает любое блюдо в шедевр",
    price: 450,
    emoji: "🫙",
    tag: "Новинка",
    image: "https://cdn.poehali.dev/projects/071e3c4d-3264-4929-b5b1-c82e7521c464/bucket/25dce574-ce98-4179-897a-77b9632802f4.jpg",
  },
  {
    id: 3,
    name: "Аджика «Огонёк»",
    desc: "Грибная аджика с лесным характером. Острая, насыщенная, без консервантов",
    price: 320,
    emoji: "🌶️",
    tag: null,
  },
  {
    id: 4,
    name: "Чайный сбор",
    desc: "Авторский сбор из лесных трав и ягод. Каждая чашка — прогулка по кировскому лесу",
    price: 250,
    emoji: "🌿",
    tag: null,
  },
  {
    id: 5,
    name: "Грибные цукаты",
    desc: "Необычное лакомство из грибов в натуральном сиропе. Идеальный подарок для гурмана",
    price: 350,
    emoji: "✨",
    tag: "Авторский рецепт",
  },
  {
    id: 6,
    name: "Солёные грузди",
    desc: "Хрустящие грузди, собранные вручную и засоленные по традиционному семейному рецепту",
    price: 480,
    emoji: "🪣",
    tag: null,
  },
];

const reviews = [
  {
    name: "Марина К.",
    city: "Киров",
    text: "Варенье из лисичек — это что-то невероятное! Заказала в подарок, а теперь покупаю себе каждый месяц. Вкус — как из детства, только лучше.",
    rating: 5,
  },
  {
    name: "Алексей В.",
    city: "Киров",
    text: "Масло из белого гриба добавляю в пасту и ризотто. Ресторанный уровень у себя дома. Доставили быстро, упаковка красивая.",
    rating: 5,
  },
  {
    name: "Светлана П.",
    city: "Киров",
    text: "Взяла набор в подарок коллегам — все были в восторге. Солёные грузди — просто что-то! Теперь постоянный клиент.",
    rating: 5,
  },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
      }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "var(--cream)" }}>

      {/* HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{ backgroundColor: "rgba(250,247,242,0.93)", borderColor: "var(--beige-dark)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={LOGO}
              alt="Грибы Да! Ягоды"
              className="w-12 h-12 rounded-full object-cover"
              style={{ border: "2px solid var(--beige-dark)" }}
            />
            <div>
              <div className="font-display font-semibold text-lg leading-tight" style={{ color: "var(--forest)" }}>
                Грибы Да! Ягоды
              </div>
              <div className="text-xs" style={{ color: "var(--terra)" }}>Авторские продукты из дикоросов</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "var(--forest)" }}>
            <a href="#products" className="hover:opacity-60 transition-opacity">Продукты</a>
            <a href="#about" className="hover:opacity-60 transition-opacity">О нас</a>
            <a href="#wholesale" className="hover:opacity-60 transition-opacity">Оптом</a>
            <a href="#contact" className="hover:opacity-60 transition-opacity">Контакты</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://vk.com/gribdayagod"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-opacity hover:opacity-75"
              style={{ backgroundColor: "var(--forest)", color: "var(--beige)" }}
              title="ВКонтакте"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.709-1.033-1.003-1.49-.9-1.49.525v1.184c0 .42-.132.524-1.202.524-1.77 0-3.732-1.073-5.11-3.073-2.075-2.923-2.645-5.107-2.645-5.575 0-.21.078-.407.288-.407h1.744c.426 0 .587.197.748.657.82 2.374 2.19 4.455 2.755 4.455.21 0 .31-.1.31-.645V9.978c-.065-1.16-.679-1.258-.679-1.67 0-.2.164-.407.427-.407h2.742c.36 0 .49.197.49.624v3.352c0 .36.164.49.263.49.21 0 .393-.13.786-.523 1.22-1.365 2.087-3.467 2.087-3.467.115-.243.31-.47.736-.47h1.744c.524 0 .638.27.524.636-.22.999-2.35 4.028-2.35 4.028-.186.306-.252.44 0 .78.186.25.8.77 1.21 1.24.753.85 1.33 1.56 1.487 2.05.147.492-.115.74-.607.74z"/>
              </svg>
            </a>
            <a
              href="tel:+79513546447"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ backgroundColor: "var(--terra)", color: "#fff" }}
            >
              <Icon name="Phone" size={14} />
              +7 (951) 354-64-47
            </a>
          </div>

          <button
            className="md:hidden p-2"
            style={{ color: "var(--forest)" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden border-t px-6 py-4 space-y-3"
            style={{ borderColor: "var(--beige-dark)", backgroundColor: "var(--cream)" }}
          >
            {(["#products", "#about", "#wholesale", "#contact"] as const).map((href, i) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium py-1"
                style={{ color: "var(--forest)" }}
              >
                {["Продукты", "О нас", "Оптом", "Контакты"][i]}
              </a>
            ))}
            <a
              href="tel:+78332000000"
              className="flex items-center gap-2 text-sm font-medium mt-2"
              style={{ color: "var(--terra)" }}
            >
              <Icon name="Phone" size={14} />
              +7 (8332) 00-00-00
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            filter: "brightness(0.42) saturate(0.75)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(26,31,27,0.72) 0%, rgba(44,59,45,0.35) 100%)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 w-full">
          <div className="max-w-2xl">
            <div
              style={{
                transition: "opacity 0.8s ease, transform 0.8s ease",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(40px)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="deco-line" />
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "var(--terra-light)" }}
                >
                  Ручной сбор · Киров
                </span>
              </div>

              <h1
                className="font-display text-5xl md:text-[4.5rem] font-light leading-[1.1] mb-6"
                style={{ color: "#FAF7F2" }}
              >
                Дары леса —<br />
                <em className="font-normal" style={{ color: "var(--beige-dark)" }}>прямо к столу</em>
              </h1>

              <p
                className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
                style={{ color: "rgba(245,239,230,0.82)" }}
              >
                Авторские продукты из кировских дикоросов. Никаких усилителей — только лес, любовь и семейные рецепты.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all hover:opacity-90 hover:scale-[1.02]"
                  style={{ backgroundColor: "var(--terra)", color: "#fff" }}
                >
                  Смотреть продукты
                  <Icon name="ArrowRight" size={18} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-medium transition-all border hover:bg-white/5"
                  style={{ borderColor: "rgba(245,239,230,0.35)", color: "var(--beige)" }}
                >
                  Заказать доставку
                </a>
              </div>
            </div>

            <div
              className="mt-20 flex gap-10"
              style={{
                transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              }}
            >
              {[
                { num: "12+", label: "лет в лесу" },
                { num: "100%", label: "натуральный состав" },
                { num: "6", label: "авторских рецептов" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-semibold" style={{ color: "var(--terra-light)" }}>{s.num}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(245,239,230,0.55)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ color: "rgba(245,239,230,0.4)", animation: "bounce 2s infinite" }}
        >
          <Icon name="ChevronDown" size={22} />
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="deco-line" />
            <p className="text-xs font-semibold tracking-widest uppercase mt-4 mb-3" style={{ color: "var(--terra)" }}>
              Наш ассортимент
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light" style={{ color: "var(--forest)" }}>
              Авторские продукты
            </h2>
            <p className="mt-4 text-base max-w-md mx-auto" style={{ color: "#6B7C6E" }}>
              Каждый продукт — история, которую мы собираем в кировских лесах и готовим дома
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <div
                  className="product-card relative rounded-2xl overflow-hidden border h-full"
                  style={{ backgroundColor: "#fff", borderColor: "var(--beige-dark)" }}
                >
                  <div
                    className="relative h-52 flex items-center justify-center overflow-hidden"
                    style={{ background: "linear-gradient(135deg, var(--beige) 0%, var(--beige-dark) 100%)" }}
                  >
                    {"image" in p && p.image
                      ? <img src={p.image as string} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                      : <span className="text-7xl select-none">{p.emoji}</span>
                    }
                    {p.tag && (
                      <div
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: "var(--terra)", color: "#fff" }}
                      >
                        {p.tag}
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col h-[calc(100%-13rem)]">
                    <h3
                      className="font-display text-xl font-semibold mb-2 leading-snug"
                      style={{ color: "var(--forest)" }}
                    >
                      {p.name}
                    </h3>
                    <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "#6B7C6E" }}>{p.desc}</p>

                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl font-semibold" style={{ color: "var(--terra)" }}>
                        {p.price} ₽
                      </span>
                      <a
                        href="#contact"
                        className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-85"
                        style={{ backgroundColor: "var(--forest)", color: "var(--beige)" }}
                      >
                        Заказать
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6" style={{ backgroundColor: "var(--forest)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <span className="deco-line" />
                <p
                  className="text-xs font-semibold tracking-widest uppercase mt-4 mb-3"
                  style={{ color: "var(--terra-light)" }}
                >
                  История семьи
                </p>
                <h2
                  className="font-display text-4xl md:text-5xl font-light mb-6 leading-tight"
                  style={{ color: "var(--beige)" }}
                >
                  Мы — семья,<br />
                  <em style={{ color: "var(--terra-light)" }}>влюблённая в лес</em>
                </h2>
                <div className="space-y-4 text-base leading-relaxed" style={{ color: "rgba(245,239,230,0.78)" }}>
                  <p>
                    Всё началось с бабушкиного погреба и её варенья, которое мы привозили в город как самый ценный сувенир. В 2012 году мы с Андреем решили: пусть этот вкус будет у всех.
                  </p>
                  <p>
                    Каждое лето выходим в кировские леса сами. Не нанимаем сборщиков — собираем руками. Знаем, где растут лучшие белые и как засолить грузди, чтобы они хрустели зимой.
                  </p>
                  <p>
                    Наши продукты — не производство. Это ремесло, которое мы передаём детям.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Leaf", title: "Ручной сбор", desc: "Каждый гриб и ягода собраны лично в экологичных районах Кировской области" },
                  { icon: "FlaskConical", title: "Без консервантов", desc: "Только натуральные ингредиенты. Состав читается за 5 секунд" },
                  { icon: "Heart", title: "Авторские рецепты", desc: "12 лет экспериментов, семейные секреты и сотни счастливых клиентов" },
                  { icon: "Award", title: "Малотиражно", desc: "Не более 50 банок каждого вида за сезон — каждая сделана с душой" },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="p-5 rounded-2xl border"
                    style={{ borderColor: "rgba(245,239,230,0.1)", backgroundColor: "rgba(245,239,230,0.05)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: "var(--terra)" }}
                    >
                      <Icon name={f.icon} size={18} style={{ color: "#fff" }} />
                    </div>
                    <h4 className="font-semibold text-sm mb-1" style={{ color: "var(--beige)" }}>{f.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(245,239,230,0.55)" }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--beige)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="deco-line" />
            <p className="text-xs font-semibold tracking-widest uppercase mt-4 mb-3" style={{ color: "var(--terra)" }}>
              Отзывы покупателей
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light" style={{ color: "var(--forest)" }}>
              Что говорят наши клиенты
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 100}>
                <div
                  className="p-8 rounded-2xl border h-full"
                  style={{ backgroundColor: "#fff", borderColor: "var(--beige-dark)" }}
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <span key={j} style={{ color: "var(--gold)" }}>★</span>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "#4A5E4C" }}>«{r.text}»</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-display font-semibold"
                      style={{ backgroundColor: "var(--forest)", color: "var(--beige)" }}
                    >
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "var(--forest)" }}>{r.name}</div>
                      <div className="text-xs" style={{ color: "#6B7C6E" }}>{r.city}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHOLESALE */}
      <section id="wholesale" className="py-24 px-6" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{ background: "linear-gradient(135deg, #1A1F1B 0%, var(--forest) 60%, var(--forest-light) 100%)" }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(ellipse at 75% 50%, var(--terra) 0%, transparent 55%)" }}
              />
              <div className="relative z-10 p-10 md:p-16 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="deco-line" />
                    <span
                      className="text-xs font-semibold tracking-widest uppercase"
                      style={{ color: "var(--terra-light)" }}
                    >
                      Для бизнеса
                    </span>
                  </div>
                  <h2
                    className="font-display text-4xl md:text-5xl font-light mb-5 leading-tight"
                    style={{ color: "var(--beige)" }}
                  >
                    Оптовое<br />
                    <em style={{ color: "var(--terra-light)" }}>предложение</em>
                  </h2>
                  <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(245,239,230,0.78)" }}>
                    Работаем с кафе, ресторанами и гастрономическими бутиками. Уникальные продукты, которых нет у конкурентов.
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      "Индивидуальная фирменная упаковка",
                      "Поставки от 20 единиц одного вида",
                      "Персональный менеджер и гибкие условия",
                      "Все документы и сертификаты качества",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 text-sm"
                        style={{ color: "rgba(245,239,230,0.82)" }}
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: "var(--terra)" }}
                        >
                          <Icon name="Check" size={11} style={{ color: "#fff" }} />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all hover:opacity-90 hover:scale-[1.02]"
                    style={{ backgroundColor: "var(--terra)", color: "#fff" }}
                  >
                    Обсудить условия
                    <Icon name="ArrowRight" size={18} />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: "20+", label: "партнёров-кафе" },
                    { num: "3 дня", label: "обработка заказа" },
                    { num: "−15%", label: "скидка с 1-го заказа" },
                    { num: "100%", label: "гарантия качества" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="p-6 rounded-2xl border text-center"
                      style={{
                        borderColor: "rgba(245,239,230,0.1)",
                        backgroundColor: "rgba(245,239,230,0.06)",
                      }}
                    >
                      <div
                        className="font-display text-3xl font-semibold mb-1"
                        style={{ color: "var(--terra-light)" }}
                      >
                        {s.num}
                      </div>
                      <div className="text-xs" style={{ color: "rgba(245,239,230,0.55)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DELIVERY */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--beige-dark)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="deco-line" />
            <p className="text-xs font-semibold tracking-widest uppercase mt-4 mb-3" style={{ color: "var(--terra)" }}>
              Доставка
            </p>
            <h2 className="font-display text-4xl font-light" style={{ color: "var(--forest)" }}>
              Как получить заказ
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "MessageCircle", step: "01", title: "Напишите нам", desc: "Оставьте заявку через форму или позвоните — обсудим состав и количество" },
              { icon: "Package", step: "02", title: "Соберём заказ", desc: "Упакуем каждую банку с любовью. Готовность — 1–2 рабочих дня" },
              { icon: "MapPin", step: "03", title: "Доставим по Кирову", desc: "Бесплатная доставка от 1000 ₽ по Кирову. По всей России — СДЭК" },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 100}>
                <div
                  className="relative p-8 rounded-2xl border"
                  style={{ backgroundColor: "#fff", borderColor: "var(--beige-dark)" }}
                >
                  <span
                    className="absolute top-5 right-6 font-display text-5xl font-light"
                    style={{ color: "var(--terra)", opacity: 0.08 }}
                  >
                    {s.step}
                  </span>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: "var(--forest)" }}
                  >
                    <Icon name={s.icon} size={22} style={{ color: "var(--beige)" }} />
                  </div>
                  <h3 className="font-semibold text-base mb-2" style={{ color: "var(--forest)" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7C6E" }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6" style={{ backgroundColor: "var(--forest)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <span className="deco-line" />
                <p
                  className="text-xs font-semibold tracking-widest uppercase mt-4 mb-3"
                  style={{ color: "var(--terra-light)" }}
                >
                  Контакты
                </p>
                <h2
                  className="font-display text-4xl md:text-5xl font-light mb-6 leading-tight"
                  style={{ color: "var(--beige)" }}
                >
                  Свяжитесь<br />
                  <em style={{ color: "var(--terra-light)" }}>с нами</em>
                </h2>
                <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(245,239,230,0.72)" }}>
                  Оставьте заявку — перезвоним в течение часа и поможем выбрать лучшие продукты.
                </p>

                <div className="space-y-5">
                  {[
                    { icon: "Phone", label: "Телефон", value: "+7 (951) 354-64-47", href: "tel:+79513546447" },

                    { icon: "MapPin", label: "Адрес", value: "г. Киров, ул. Альберта Лиханова д. 30", href: null },
                    { icon: "Clock", label: "Режим работы", value: "Ежедневно, 10:00–20:00", href: null },
                  ].map((c) => (
                    <div key={c.label} className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "rgba(245,239,230,0.07)" }}
                      >
                        <Icon name={c.icon} size={18} style={{ color: "var(--terra-light)" }} />
                      </div>
                      <div>
                        <div className="text-xs mb-0.5" style={{ color: "rgba(245,239,230,0.45)" }}>{c.label}</div>
                        {c.href
                          ? <a href={c.href} className="text-sm font-medium hover:opacity-75 transition-opacity" style={{ color: "var(--beige)" }}>{c.value}</a>
                          : <div className="text-sm font-medium" style={{ color: "var(--beige)" }}>{c.value}</div>
                        }
                      </div>
                    </div>
                  ))}

                  {/* ВКонтакте */}
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(245,239,230,0.07)" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--terra-light)" }}>
                        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.709-1.033-1.003-1.49-.9-1.49.525v1.184c0 .42-.132.524-1.202.524-1.77 0-3.732-1.073-5.11-3.073-2.075-2.923-2.645-5.107-2.645-5.575 0-.21.078-.407.288-.407h1.744c.426 0 .587.197.748.657.82 2.374 2.19 4.455 2.755 4.455.21 0 .31-.1.31-.645V9.978c-.065-1.16-.679-1.258-.679-1.67 0-.2.164-.407.427-.407h2.742c.36 0 .49.197.49.624v3.352c0 .36.164.49.263.49.21 0 .393-.13.786-.523 1.22-1.365 2.087-3.467 2.087-3.467.115-.243.31-.47.736-.47h1.744c.524 0 .638.27.524.636-.22.999-2.35 4.028-2.35 4.028-.186.306-.252.44 0 .78.186.25.8.77 1.21 1.24.753.85 1.33 1.56 1.487 2.05.147.492-.115.74-.607.74z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs mb-0.5" style={{ color: "rgba(245,239,230,0.45)" }}>ВКонтакте</div>
                      <a
                        href="https://vk.com/gribdayagod"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:opacity-75 transition-opacity"
                        style={{ color: "var(--beige)" }}
                      >
                        vk.com/gribdayagod
                      </a>
                    </div>
                  </div>


                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              {submitted ? (
                <div
                  className="rounded-2xl p-12 text-center border"
                  style={{ backgroundColor: "rgba(245,239,230,0.05)", borderColor: "rgba(245,239,230,0.1)" }}
                >
                  <div className="text-5xl mb-4">🌿</div>
                  <h3
                    className="font-display text-2xl font-semibold mb-3"
                    style={{ color: "var(--beige)" }}
                  >
                    Заявка отправлена!
                  </h3>
                  <p className="text-sm" style={{ color: "rgba(245,239,230,0.65)" }}>
                    Мы перезвоним в течение часа. Спасибо за доверие!
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-8 border space-y-5"
                  style={{ backgroundColor: "rgba(245,239,230,0.05)", borderColor: "rgba(245,239,230,0.1)" }}
                >
                  <div>
                    <h3 className="font-display text-2xl font-semibold" style={{ color: "var(--beige)" }}>
                      Оставить заявку
                    </h3>
                    <p className="text-sm mt-1" style={{ color: "rgba(245,239,230,0.5)" }}>
                      Частный заказ или оптовый запрос — одна форма
                    </p>
                  </div>

                  {[
                    { label: "Ваше имя *", type: "text", key: "name", placeholder: "Иван" },
                    { label: "Телефон *", type: "tel", key: "phone", placeholder: "+7 (___) ___-__-__" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label
                        className="block text-xs font-medium mb-1.5"
                        style={{ color: "rgba(245,239,230,0.55)" }}
                      >
                        {field.label}
                      </label>
                      <input
                        required={field.key !== "message"}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                        style={{
                          backgroundColor: "rgba(245,239,230,0.07)",
                          borderColor: "rgba(245,239,230,0.13)",
                          color: "var(--beige)",
                        }}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      className="block text-xs font-medium mb-1.5"
                      style={{ color: "rgba(245,239,230,0.55)" }}
                    >
                      Сообщение
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Что хотите заказать? Или просто — перезвоните мне"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm border outline-none resize-none"
                      style={{
                        backgroundColor: "rgba(245,239,230,0.07)",
                        borderColor: "rgba(245,239,230,0.13)",
                        color: "var(--beige)",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-semibold text-base transition-all hover:opacity-90 active:scale-[0.99]"
                    style={{ backgroundColor: "var(--terra)", color: "#fff" }}
                  >
                    Отправить заявку
                  </button>

                  <p className="text-xs text-center" style={{ color: "rgba(245,239,230,0.28)" }}>
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-8 px-6 border-t"
        style={{ backgroundColor: "var(--dark)", borderColor: "rgba(245,239,230,0.07)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={LOGO}
              alt="Грибы Да! Ягоды"
              className="w-9 h-9 rounded-full object-cover opacity-80"
            />
            <span className="font-display text-base font-semibold" style={{ color: "var(--beige)" }}>
              Грибы Да! Ягоды
            </span>
          </div>
          <p className="text-xs" style={{ color: "rgba(245,239,230,0.28)" }}>
            © 2024 · Киров · Авторские продукты из дикоросов
          </p>
          <a href="tel:+79513546447" className="text-sm font-medium" style={{ color: "var(--terra-light)" }}>
            +7 (951) 354-64-47
          </a>
        </div>
      </footer>

    </div>
  );
}