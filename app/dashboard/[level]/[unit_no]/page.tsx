"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Volume2, ArrowLeft } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

const SWIPE_THRESHOLD = 110;

type Article = "der" | "die" | "das" | null;

type CardItem = {
  id: string;
  unitTitle: string;
  de: string;
  en: string;
  article?: Article;
  exampleDe?: string;
  exampleEn?: string;
};

const ARTICLE_TONE = {
  der: {
    pill: "bg-sky-50 text-sky-600 ring-sky-200",
    highlight: "text-sky-600",
    glow: "shadow-sky-600/25",
    border: "ring-sky-200",
  },
  die: {
    pill: "bg-pink-50 text-pink-600 ring-pink-200",
    highlight: "text-pink-600",
    glow: "shadow-pink-600/25",
    border: "ring-pink-200",
  },
  das: {
    pill: "bg-emerald-50 text-emerald-600 ring-emerald-200",
    highlight: "text-emerald-600",
    glow: "shadow-emerald-600/25",
    border: "ring-emerald-200",
  },
  none: {
    pill: "bg-slate-50 text-slate-600 ring-slate-200",
    highlight: "text-blue-600",
    glow: "shadow-blue-600/20",
    border: "ring-slate-200",
  },
} as const;

function getTone(article?: Article) {
  if (!article) return ARTICLE_TONE.none;
  return ARTICLE_TONE[article];
}

function highlightWord(
  sentence: string,
  word: string,
  className: string
) {
  const idx = sentence
    .toLowerCase()
    .indexOf(word.toLowerCase());
  if (idx < 0) return <span>{sentence}</span>;

  const before = sentence.slice(0, idx);
  const match = sentence.slice(idx, idx + word.length);
  const after = sentence.slice(idx + word.length);

  return (
    <span>
      {before}
      <span className={cn("font-bold", className)}>
        {match}
      </span>
      {after}
    </span>
  );
}

export default function CardsPage() {
  const router = useRouter();
  const params = useParams();
  const level = (params.level as string) ?? "";

  // mock data (istersen useMemo yapabilirsin ama şart değil)
  const cards: CardItem[] = [
    {
      id: "1",
      unitTitle: "ÜNİTE 3: YİYECEKLER",
      article: "der",
      de: "Apfel",
      en: "Apple",
      exampleDe: "Der Apfel ist rot und lecker.",
      exampleEn: "The apple is red and tasty.",
    },
    {
      id: "2",
      unitTitle: "ÜNİTE 3: YİYECEKLER",
      article: "die",
      de: "Banane",
      en: "Banana",
      exampleDe: "Die Banane ist gelb.",
      exampleEn: "The banana is yellow.",
    },
    {
      id: "3",
      unitTitle: "ÜNİTE 3: YİYECEKLER",
      de: "Brot",
      en: "Bread",
      exampleDe: "Brot ist sehr lecker.",
      exampleEn: "Bread is very tasty.",
    },
  ];

  const [index, setIndex] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);

  // Motion hooks (her render aynı sırada çağrılır)
  const x = useMotionValue(0);
  const rotate = useTransform(
    x,
    [-220, 0, 220],
    [-10, 0, 10]
  );
  const likeOpacity = useTransform(x, [40, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -40], [1, 0]);

  const done = index >= cards.length;
  const current = done
    ? cards[cards.length - 1]
    : cards[index]; // done iken UI kırılmasın diye "son kart" referansı

  // bittiğinde otomatik geri dön (history değil, direkt hedef)
  React.useEffect(() => {
    if (!done) return;
    // back yerine kesin hedef:
    router.replace(`/dashboard/${level}`);
  }, [done, router, level]);

  const remaining = Math.max(0, cards.length - index);
  const progressPct = done
    ? 100
    : Math.round(((index + 1) / cards.length) * 100);
  const tone = getTone(current?.article ?? null);

  const advance = React.useCallback(() => {
    setFlipped(false);
    setIndex((i) => i + 1);
    x.set(0);
  }, [x]);

  const fling = React.useCallback(
    async (dir: "left" | "right") => {
      if (done) return;
      setFlipped(false);

      const targetX = dir === "right" ? 520 : -520;
      await animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 25,
      });

      advance();
      x.set(0);
    },
    [advance, x, done]
  );

  const onDragEnd = (
    _: any,
    info: { offset: { x: number } }
  ) => {
    if (done) return;
    if (info.offset.x > SWIPE_THRESHOLD)
      return void fling("right");
    if (info.offset.x < -SWIPE_THRESHOLD)
      return void fling("left");

    animate(x, 0, {
      type: "spring",
      stiffness: 350,
      damping: 30,
    });
  };

  return (
    <div className="min-h-dvh bg-slate-100">
      <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col bg-slate-100 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-4">
        {/* TOP BAR */}
        <header className="rounded-3xl bg-white px-4 pt-4 shadow-sm ring-1 ring-black/5">
          <div className="relative flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-2xl"
              onClick={() => router.back()}
              type="button"
            >
              <span className="sr-only">Geri</span>
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="absolute left-1/2 -translate-x-1/2 text-center">
              <div className="text-xs font-extrabold tracking-widest text-slate-800">
                {current?.unitTitle}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xl font-extrabold text-blue-600">
                {remaining}
              </div>
              <div className="text-[10px] font-bold tracking-widest text-slate-400">
                KALDI
              </div>
            </div>
          </div>

          <div className="pb-4 pt-3">
            <Progress
              value={progressPct}
              className="h-2 bg-slate-200"
            />
          </div>
        </header>

        {/* CARD AREA */}
        <main className="mt-22 mb-6 flex">
          <div
            className={cn(
              "relative mx-auto h-[500px] w-full rounded-3xl bg-transparent",
              "overflow-visible"
            )}
          >
            {/* done ise kartı artık sürükletme, sadece “yönlendiriliyor” hissi ver */}
            {done ? (
              <div className="relative h-full w-full rounded-3xl bg-white p-5 shadow-xl ring-1 ring-black/5">
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="text-base font-semibold text-slate-600">
                    Tamamlandı
                  </div>
                  <div className="mt-2 text-sm text-slate-400">
                    Ana sayfaya dönülüyor...
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                style={{ x, rotate }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={onDragEnd}
                className={cn(
                  "relative h-full w-full rounded-3xl bg-white p-5 shadow-xl ring-1 ring-black/5",
                  tone.glow
                )}
              >
                <motion.div
                  style={{ opacity: nopeOpacity }}
                  className="pointer-events-none absolute left-25 top-2 rounded-full bg-red-50 px-3 py-1 text-sm font-extrabold text-red-600 ring-1"
                >
                  BİLMİYORUM
                </motion.div>

                <motion.div
                  style={{ opacity: likeOpacity }}
                  className="pointer-events-none absolute right-25 top-2 rounded-full bg-green-50 px-3 py-1 text-sm font-extrabold text-green-600 ring-1"
                >
                  BİLİYORUM
                </motion.div>

                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-5 top-5 h-10 w-10 rounded-full bg-slate-50"
                  type="button"
                  onClick={() => {}}
                >
                  <Volume2 className="h-5 w-5 text-slate-600" />
                </Button>

                <button
                  type="button"
                  onClick={() => setFlipped((v) => !v)}
                  className="group relative h-full w-full cursor-pointer rounded-2xl outline-none"
                  aria-label="Kartı çevir"
                >
                  <div className="relative h-full w-full perspective-distant">
                    <motion.div
                      animate={{
                        rotateY: flipped ? 180 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 24,
                      }}
                      className="relative h-full w-full transform-3d"
                    >
                      {/* FRONT */}
                      <div className="absolute inset-0 mt-6 flex h-full w-full flex-col items-center justify-center backface-hidden">
                        {current.article ? (
                          <div
                            className={cn(
                              "rounded-full px-4 py-1 text-sm font-extrabold ring-1",
                              tone.pill
                            )}
                          >
                            {current.article}
                          </div>
                        ) : (
                          <div className="h-7" />
                        )}

                        <div className="mt-12 text-5xl font-extrabold tracking-tight text-slate-900">
                          {current.de}
                        </div>

                        <div className="mt-3 h-1 w-14 rounded-full bg-slate-200" />

                        {current.exampleDe ? (
                          <p className="mt-6 max-w-[280px] text-center text-base font-semibold text-slate-500">
                            {highlightWord(
                              current.exampleDe,
                              current.de,
                              tone.highlight
                            )}
                          </p>
                        ) : null}

                        <div className="mt-auto pb-4 text-xs font-semibold text-slate-400">
                          Çevirmek için karta dokun
                        </div>
                      </div>

                      {/* BACK */}
                      <div className="absolute inset-0 mt-6 flex h-full w-full flex-col items-center justify-center transform-[rotateY(180deg)] backface-hidden">
                        <div className="h-7" />

                        <div className="mt-12 text-5xl font-extrabold tracking-tight text-slate-900">
                          {current.en}
                        </div>

                        <div className="mt-3 h-1 w-14 rounded-full bg-slate-200" />

                        {current.exampleEn ? (
                          <p className="mt-6 max-w-[280px] text-center text-base font-semibold text-slate-500">
                            {current.exampleEn}
                          </p>
                        ) : null}

                        <div className="mt-auto pb-4 text-xs font-semibold text-slate-400">
                          Ön yüze dönmek için dokun
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </button>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
