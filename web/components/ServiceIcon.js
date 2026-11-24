import {
  Building2, PanelsTopLeft, LayoutGrid, Hammer, Armchair, Sofa, Sparkles, Layers, PaintRoller, Wrench, Cog, Scan,
  Blinds, Cable, Fan, DoorOpen, Handshake, Clock, BadgeCheck, Phone, ShieldCheck, ClipboardCheck,
} from 'lucide-react';

const MAP = {
  Building2, PanelsTopLeft, LayoutGrid, Hammer, Armchair, Sofa, Sparkles, Layers, PaintRoller, Wrench, Cog, Scan,
  Blinds, Cable, Fan, DoorOpen, Handshake, Clock, BadgeCheck, Phone, ShieldCheck, ClipboardCheck,
};

export default function ServiceIcon({ name, size = 26, strokeWidth = 1.7 }) {
  const Icon = MAP[name] || Wrench;
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}
