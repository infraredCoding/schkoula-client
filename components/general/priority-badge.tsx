import React from 'react'

type PriorityProp = {
    title: string,
};

const PriorityStyleMap: Map<string, string> = new Map<string, string>();
PriorityStyleMap.set('URGENT', 'text-slate-900 bg-slate-600');
PriorityStyleMap.set('HIGH', 'text-red-500 bg-red-400');
PriorityStyleMap.set('MEDIUM', 'text-orange-500 bg-orange-500');
PriorityStyleMap.set('LOW', 'text-green-500 bg-emerald-400');
PriorityStyleMap.set('VERY LOW', 'text-blue-500 bg-cyan-500');

export default function PriorityBadge(props: PriorityProp) {
  return (
    <div className={`text-xs mx-auto ${PriorityStyleMap.get(props.title)} bg-opacity-30 font-bold px-2 py-2 rounded-lg text-`}>
        {props.title}
    </div>
  )
}
