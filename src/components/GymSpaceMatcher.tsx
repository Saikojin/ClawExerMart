import React, { useState, useMemo } from 'react';
import { MOCK_EQUIPMENT } from '../data/mockEquipment';
import { EquipmentItem } from '../types/equipment';
import { evaluateGymSpaceFit, RoomDimensions } from '../utils/spaceCalculator';
import { Ruler, CheckCircle2, AlertTriangle, XCircle, ArrowUpRight, Home } from 'lucide-react';

interface GymSpaceMatcherProps {
  items?: EquipmentItem[];
  onSelectItem: (item: EquipmentItem) => void;
}

const ROOM_PRESETS: { name: string; dims: RoomDimensions }[] = [
  { name: 'Basement Gym (8ft Ceiling)', dims: { lengthFeet: 14, widthFeet: 12, ceilingHeightFeet: 8.0 } },
  { name: '2-Car Garage (9.5ft Ceiling)', dims: { lengthFeet: 20, widthFeet: 20, ceilingHeightFeet: 9.5 } },
  { name: 'Spare Bedroom (8ft Ceiling)', dims: { lengthFeet: 11, widthFeet: 10, ceilingHeightFeet: 8.0 } },
  { name: 'Commercial Studio (12ft Ceiling)', dims: { lengthFeet: 25, widthFeet: 30, ceilingHeightFeet: 12.0 } },
];

export const GymSpaceMatcher: React.FC<GymSpaceMatcherProps> = ({
  items = MOCK_EQUIPMENT,
  onSelectItem,
}) => {
  const [room, setRoom] = useState<RoomDimensions>(ROOM_PRESETS[0].dims);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const evaluations = useMemo(() => {
    return items.map((item) => {
      const assessment = evaluateGymSpaceFit(
        room,
        item.dimensions,
        item.ceilingClearanceRequiredInches
      );
      return { item, assessment };
    }).filter(({ item }) => {
      if (filterCategory !== 'ALL' && item.category !== filterCategory) return false;
      return true;
    });
  }, [items, room, filterCategory]);

  const fitsCount = evaluations.filter((e) => e.assessment.status === 'FITS_PERFECTLY').length;
  const tightCount = evaluations.filter((e) => e.assessment.status === 'TIGHT_CLEARANCE').length;
  const exceedsCount = evaluations.filter((e) => e.assessment.status === 'EXCEEDS_CEILING' || e.assessment.status === 'EXCEEDS_FLOOR').length;

  return (
    <div className="space-y-8 animate-fade-in" data-testid="gym-space-matcher">
      {/* Intro Header */}
      <div className="p-8 rounded-3xl apple-glass border border-slate-800 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 mb-3">
          <Ruler className="w-3.5 h-3.5" />
          Interactive Spatial Clearance Engine
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Gym Space & Ceiling Matcher
        </h1>
        <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Avoid costly returns. Input your ceiling height and floor dimensions to automatically audit which power racks, treadmills, and rowing ergs safely fit with adequate movement clearance.
        </p>
      </div>

      {/* Room Controls Panel */}
      <div className="p-6 rounded-3xl apple-glass-card border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Home className="w-4 h-4 text-amber-500" />
              Configure Your Workout Room
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select a popular layout preset or adjust custom dimension sliders.
            </p>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-2">
            {ROOM_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => setRoom(p.dims)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium apple-press border ${
                  room.ceilingHeightFeet === p.dims.ceilingHeightFeet &&
                  room.lengthFeet === p.dims.lengthFeet &&
                  room.widthFeet === p.dims.widthFeet
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-semibold text-slate-400 mr-1">Filter Type:</span>
          {['ALL', 'STRENGTH', 'CARDIO', 'FREE_WEIGHTS'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium apple-press border ${
                filterCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? 'All Types' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 tabular-nums">
          {/* Ceiling Height */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Ceiling Height</span>
              <span className="text-amber-400 font-bold" data-testid="val-ceiling-height">
                {room.ceilingHeightFeet} ft ({Math.round(room.ceilingHeightFeet * 12)}")
              </span>
            </div>
            <input
              type="range"
              min={7.0}
              max={14.0}
              step={0.5}
              value={room.ceilingHeightFeet}
              onChange={(e) => setRoom({ ...room, ceilingHeightFeet: Number(e.target.value) })}
              data-testid="slider-ceiling-height"
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>7 ft (Low Basement)</span>
              <span>14 ft (High Loft)</span>
            </div>
          </div>

          {/* Room Length */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Room Length</span>
              <span className="text-white font-bold">{room.lengthFeet} ft</span>
            </div>
            <input
              type="range"
              min={8}
              max={30}
              step={1}
              value={room.lengthFeet}
              onChange={(e) => setRoom({ ...room, lengthFeet: Number(e.target.value) })}
              data-testid="slider-room-length"
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>8 ft</span>
              <span>30 ft</span>
            </div>
          </div>

          {/* Room Width */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Room Width</span>
              <span className="text-white font-bold">{room.widthFeet} ft</span>
            </div>
            <input
              type="range"
              min={8}
              max={30}
              step={1}
              value={room.widthFeet}
              onChange={(e) => setRoom({ ...room, widthFeet: Number(e.target.value) })}
              data-testid="slider-room-width"
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>8 ft</span>
              <span>30 ft</span>
            </div>
          </div>
        </div>

        {/* Fit Summary Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs tabular-nums">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {fitsCount} Fits Ample
            </span>
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <AlertTriangle className="w-3.5 h-3.5" />
              {tightCount} Tight Clearance
            </span>
            <span className="inline-flex items-center gap-1.5 text-rose-400 font-semibold bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
              <XCircle className="w-3.5 h-3.5" />
              {exceedsCount} Exceeds Ceiling/Floor
            </span>
          </div>

          <div className="text-[11px] text-slate-400">
            Total Floor Space: <strong className="text-white">{room.lengthFeet * room.widthFeet} sq ft</strong>
          </div>
        </div>
      </div>

      {/* Equipment Clearance Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {evaluations.map(({ item, assessment }) => {
          const isFit = assessment.status === 'FITS_PERFECTLY';
          const isTight = assessment.status === 'TIGHT_CLEARANCE';
          const isExceeds = assessment.status === 'EXCEEDS_CEILING' || assessment.status === 'EXCEEDS_FLOOR';

          return (
            <div
              key={item.id}
              data-testid={`space-card-${item.id}`}
              onClick={() => onSelectItem(item)}
              className={`p-5 rounded-3xl apple-glass-card border flex flex-col justify-between cursor-pointer select-none transition-all hover:scale-[1.01] ${
                isFit
                  ? 'border-emerald-500/30'
                  : isTight
                  ? 'border-amber-500/30'
                  : 'border-rose-500/30 opacity-75'
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    title={item.brand}
                    className="text-[11px] font-bold text-amber-400 uppercase tracking-wider truncate"
                  >
                    {item.brand}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap flex-shrink-0 ${
                      isFit
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : isTight
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {isFit && <CheckCircle2 className="w-3 h-3" />}
                    {isTight && <AlertTriangle className="w-3 h-3" />}
                    {isExceeds && <XCircle className="w-3 h-3" />}
                    {isFit ? 'Fits Perfectly' : isTight ? 'Tight Clearance' : 'Ceiling Conflict'}
                  </span>
                </div>

                <h3 title={item.title} className="text-sm font-bold text-white line-clamp-2">
                  {item.title}
                </h3>

                {/* Dimension Metric Badges */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] tabular-nums">
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-500 block">Required Height</span>
                    <span className="font-semibold text-white">{item.ceilingClearanceRequiredInches}" overhead</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-500 block">Ceiling Buffer</span>
                    <span
                      className={`font-semibold ${
                        assessment.ceilingMarginInches >= 6
                          ? 'text-emerald-400'
                          : assessment.ceilingMarginInches >= 0
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {assessment.ceilingMarginInches >= 0
                        ? `+${assessment.ceilingMarginInches}" remaining`
                        : `${assessment.ceilingMarginInches}" deficit`}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-3 leading-relaxed">{assessment.notes}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs tabular-nums">
                <span className="font-bold text-white">${item.price.toLocaleString()}</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1 group-hover:underline">
                  Inspect Specs
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
