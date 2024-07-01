import { filterConfig } from '@/lib/utils';
import { Feedback } from '../lib/hooks';

export function RenderAttribute({
  attributeKey,
}: {
  attributeKey: keyof Feedback;
}) {
  const config = filterConfig[attributeKey];
  return (
    <div className="flex items-center gap-1">
      <config.icon size="14px" />
      <span>{config.display}</span>
    </div>
  );
}
