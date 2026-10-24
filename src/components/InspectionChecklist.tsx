import React from 'react';
import { InspectionReport } from '../types/equipment';
import { CheckCircle2, ShieldCheck, Calendar, UserCheck } from 'lucide-react';

interface InspectionChecklistProps {
  report: InspectionReport;
  score: number;
  condition: string;
}

export const InspectionChecklist: React.FC<InspectionChecklistProps> = ({
  report,
  score,
  condition,
}) => {
  const isNew = condition === 'NEW';

  const checkItems = [
    {
      title: 'Structural Frame & Welds',
      status: report.frameIntegrity,
      description: 'Laser alignment and ultrasonic weld inspection. Zero torsional twist or metal fatigue.',
    },
    {
      title: 'Bearings & Bushings Spin',
      status: report.bearingSmoothness ?? 'PASS',
      description: 'Precision dial runout testing. Sleeves and rollers rotate smoothly without chatter.',
    },
    {
      title: 'Cables & Pulley Tension',
      status: report.cableTensionAndPulleys ?? 'PASS',
      description: 'Aircraft-grade cable core check with zero frayed strands. Smooth pulley tracking.',
    },
    {
      title: 'Upholstery & Heavy Vinyl',
      status: report.upholsteryWear ?? 'PRISTINE',
      description: 'High-density foam rebound and tear-free marine vinyl seams.',
    },
    {
      title: 'Surface Rust & Oxidation',
      status: report.rustCheck,
      description: 'Cleaned, treated, and powder-coat depth verified. Zero structural corrosion.',
    },
    {
      title: 'Safety Latches & Pin Locking',
      status: report.safetyLocksAndPins,
      description: 'Spring detent pins and J-cups lock firmly under load testing.',
    },
  ];

  return (
    <div
      data-testid="inspection-checklist"
      className="rounded-2xl p-5 bg-slate-900/60 border border-slate-800/80 space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Claw Certified 8-Point Physical Inspection
            </h4>
            <p className="text-[11px] text-slate-400">
              {isNew ? 'Factory New Quality Verification' : 'Bench-Tested by Master Fitness Technicians'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            Score: {score} / 100
          </span>
        </div>
      </div>

      {/* Grid of inspection points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {checkItems.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 flex items-start gap-2.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-200">{item.title}</span>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-1.5 rounded">
                  {item.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cardio Motor Hours if applicable */}
      {typeof report.motorHoursCardio === 'number' && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
          <span className="font-semibold text-amber-300">Logged Operating Meter Hours:</span>
          <span className="font-bold text-white">
            {report.motorHoursCardio === 0
              ? 'Motorless Curved Belt (Zero Hours)'
              : `${report.motorHoursCardio} hrs (Very Low Usage)`}
          </span>
        </div>
      )}

      {/* Technician Notes */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 font-semibold text-slate-300">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            Inspector Findings & Notes:
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Inspected {report.inspectionDate}
          </span>
        </div>
        <p className="text-xs text-slate-300 italic leading-relaxed">
          "{report.certifiedTechNotes}"
        </p>
      </div>
    </div>
  );
};
