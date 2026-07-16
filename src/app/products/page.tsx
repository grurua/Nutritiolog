'use client';

import { useState, useMemo } from 'react';
import { products, CATEGORIES, type CategoryKey, type Product } from '@/lib/products';

type SortMode = 'sugar-desc' | 'sugar-asc' | 'calories-desc' | 'calories-asc';

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: 'sugar-desc', label: 'შაქარი: მეტიდან ნაკლებისკენ' },
  { value: 'sugar-asc', label: 'შაქარი: ნაკლებიდან მეტისკენ' },
  { value: 'calories-desc', label: 'კალორია: მეტიდან ნაკლებისკენ' },
  { value: 'calories-asc', label: 'კალორია: ნაკლებიდან მეტისკენ' },
];

function SugarBar({ sugar, max }: { sugar: number; max: number }) {
  const pct = max > 0 ? Math.min((sugar / max) * 100, 100) : 0;
  const color = sugar === 0 ? 'bg-emerald-400' : sugar < 10 ? 'bg-yellow-400' : sugar < 30 ? 'bg-orange-400' : 'bg-red-400';
  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

const SVG_FALLBACKS: Record<string, string> = {
  'redbull': '/products/redbull.svg',
  'coca-cola': '/products/coca-cola.svg',
  'coca-cola-zero': '/products/coca-cola-zero.svg',
  'fanta': '/products/fanta.svg',
  'sprite': '/products/sprite.svg',
  'pepsi': '/products/pepsi.svg',
  'limonati-tarhun': '/products/limonati-tarhun.svg',
  'limonati-feijoa': '/products/limonati-feijoa.svg',
  'borjomi': '/products/borjomi.svg',
  'nabeghlavi': '/products/nabeghlavi.svg',
  'monster': '/products/monster.svg',
  'beer-argo': '/products/beer.svg',
  'beer-natakhtari': '/products/beer.svg',
  'beer-heineken': '/products/heineken.svg',
  'wine-red': '/products/wine-red.svg',
  'wine-white': '/products/wine-white.svg',
  'chacha': '/products/spirits.svg',
  'vodka': '/products/spirits.svg',
  'whiskey': '/products/spirits.svg',
  'lays-classic': '/products/lays.svg',
  'doritos': '/products/doritos.svg',
  'snickers': '/products/snickers.svg',
  'kitkat': '/products/kitkat.svg',
  'churchkhela': '/products/churchkhela.svg',
  'tklapi': '/products/tklapi.svg',
  'pringles': '/products/pringles.svg',
  'dark-chocolate-85': '/products/dark-chocolate.svg',
  'rice-cakes': '/products/rice-cakes.svg',
  'walnut': '/products/walnut.svg',
  'almond': '/products/almond.svg',
  'hazelnut': '/products/hazelnut.svg',
  'pistachio': '/products/pistachio.svg',
  'cashew': '/products/cashew.svg',
  'peanut': '/products/peanut.svg',
  'sunflower-seeds': '/products/sunflower-seeds.svg',
  'pumpkin-seeds': '/products/pumpkin-seeds.svg',
};

function ProductCard({ product, maxSugar }: { product: Product; maxSugar: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl border ${product.isHealthy ? 'border-emerald-200' : 'border-gray-200'} overflow-hidden transition-shadow hover:shadow-md`}
    >
      <div className="h-32 bg-white flex items-center justify-center relative border-b border-gray-100 p-2">
        <img
          src={product.image}
          alt={product.name}
          className="h-24 max-w-[85%] object-contain"
          onError={(e) => {
            const fallback = SVG_FALLBACKS[product.id];
            if (fallback && !e.currentTarget.src.endsWith('.svg')) {
              e.currentTarget.src = fallback;
            }
          }}
        />
        {product.isHealthy && (
          <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200">
            ჯანსაღი
          </span>
        )}
        <div className="absolute bottom-2 right-2 bg-gray-900/80 backdrop-blur-sm rounded-lg px-2 py-0.5">
          <span className="text-white text-xs font-bold">{product.calories} კკალ</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h3>
            <p className="text-xs text-gray-400">{product.servingSize}</p>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-500">შაქარი</span>
            <span className={`font-medium ${product.sugar === 0 ? 'text-emerald-600' : product.sugar < 10 ? 'text-yellow-600' : 'text-red-600'}`}>
              {product.sugar} გ
            </span>
          </div>
          <SugarBar sugar={product.sugar} max={maxSugar} />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-50 rounded-lg py-1.5 px-1">
            <p className="text-xs font-semibold text-gray-900">{product.protein} გ</p>
            <p className="text-[10px] text-gray-400">ცილა</p>
          </div>
          <div className="bg-gray-50 rounded-lg py-1.5 px-1">
            <p className="text-xs font-semibold text-gray-900">{product.fat} გ</p>
            <p className="text-[10px] text-gray-400">ცხიმი</p>
          </div>
          <div className="bg-gray-50 rounded-lg py-1.5 px-1">
            <p className="text-xs font-semibold text-gray-900">{product.carbs} გ</p>
            <p className="text-[10px] text-gray-400">ნახშირწყლები</p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 w-full text-xs text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1 transition-colors"
        >
          {expanded ? 'დამალვა' : 'შემადგენლობა'}
          <svg className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 px-4 py-3 bg-gray-50/50">
          <p className="text-xs font-medium text-gray-500 mb-2">შემადგენლობა:</p>
          <div className="flex flex-wrap gap-1.5">
            {product.ingredients.map((ing, i) => (
              <span key={i} className="px-2 py-0.5 bg-white border border-gray-200 rounded-full text-[11px] text-gray-600">
                {ing}
              </span>
            ))}
          </div>
          {product.healthNote && (
            <div className={`mt-3 p-2.5 rounded-lg text-xs ${product.isHealthy ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
              {product.healthNote}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  const [category, setCategory] = useState<CategoryKey>('all');
  const [sort, setSort] = useState<SortMode>('sugar-desc');

  const filtered = useMemo(() => {
    let result: Product[];

    if (category === 'healthy') {
      result = products.filter((p) => p.isHealthy);
    } else if (category === 'all') {
      result = [...products];
    } else {
      result = products.filter((p) => p.category === category);
    }

    result.sort((a, b) => {
      switch (sort) {
        case 'sugar-desc': return b.sugar - a.sugar;
        case 'sugar-asc': return a.sugar - b.sugar;
        case 'calories-desc': return b.calories - a.calories;
        case 'calories-asc': return a.calories - b.calories;
      }
    });

    return result;
  }, [category, sort]);

  const maxSugar = useMemo(() => Math.max(...products.map((p) => p.sugar), 1), []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length, healthy: products.filter((p) => p.isHealthy).length };
    for (const p of products) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">პროდუქტების კალორიულობა</h1>
        <p className="text-sm text-gray-500">
          გაიგე რამდენ კალორიას და შაქარს შეიცავს შენი საყვარელი პროდუქტები
        </p>
      </div>

      {/* Category filter - horizontal scroll on mobile */}
      <div className="mb-4 -mx-4 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-medium transition-colors ${
                category === key
                  ? key === 'healthy'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {CATEGORIES[key]}
              <span className={`ml-1.5 ${category === key ? 'opacity-70' : 'text-gray-400'}`}>
                {categoryCounts[key] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="mb-5 flex items-center gap-2">
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortMode)}
          className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="text-xs text-gray-400 ml-auto">{filtered.length} პროდუქტი</span>
      </div>

      {/* Healthy disclaimer */}
      {category === 'healthy' && (
        <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-800 mb-1">შაქრის გარეშე / ნორმალიზებული</p>
              <p className="text-xs text-emerald-700 leading-relaxed">
                ეს პროდუქტები არ შეიცავს შაქარს ან შეიცავს მინიმალურ რაოდენობას.
                ისინი ჯანსაღი ცხოვრების წესისთვის მისაღებია ზომიერად მიღებისას.
                <strong className="block mt-1">ეს არ არის რეკომენდაცია — თუ რაიმე მოგინდა, მცირე რაოდენობით არაფერი დიდი არ დაშავდება, მაგრამ ეს არ ნიშნავს რომ შეუზღუდავად შეიძლება მიღება.</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} maxSugar={maxSugar} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm">ამ კატეგორიაში პროდუქტები არ მოიძებნა</p>
        </div>
      )}

      {/* General disclaimer */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-600">შენიშვნა:</strong> მონაცემები საშუალო მაჩვენებლებზეა დაფუძნებული და შეიძლება
          მწარმოებლის მიხედვით განსხვავდებოდეს. ეს ინფორმაცია მხოლოდ საინფორმაციო
          ხასიათისაა და არ წარმოადგენს სამედიცინო რეკომენდაციას.
        </p>
      </div>
    </div>
  );
}
