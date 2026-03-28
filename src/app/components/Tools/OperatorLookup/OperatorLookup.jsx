'use client';
import { useState, useMemo } from 'react';
import styles from '../GradientGenerator/GradientGenerator.module.scss';

const OPERATORS = [
  // JS Logical
  { symbol: '&&', name: 'Logical AND', lang: 'JS', desc: 'Returns first falsy value or last value. Short-circuit evaluation.' },
  { symbol: '||', name: 'Logical OR', lang: 'JS', desc: 'Returns first truthy value or last value. Short-circuit evaluation.' },
  { symbol: '??', name: 'Nullish Coalescing', lang: 'JS', desc: 'Returns right-hand operand when left is null or undefined only.' },
  { symbol: '!', name: 'Logical NOT', lang: 'JS', desc: 'Converts value to boolean, then negates it.' },
  { symbol: '?.', name: 'Optional Chaining', lang: 'JS', desc: 'Safe property access — returns undefined instead of throwing.' },
  // JS Bitwise
  { symbol: '&', name: 'Bitwise AND', lang: 'JS', desc: 'Performs AND on each bit pair.' },
  { symbol: '|', name: 'Bitwise OR', lang: 'JS', desc: 'Performs OR on each bit pair.' },
  { symbol: '^', name: 'Bitwise XOR', lang: 'JS', desc: 'Performs exclusive OR on each bit pair.' },
  { symbol: '~', name: 'Bitwise NOT', lang: 'JS', desc: 'Inverts each bit. ~n === -(n+1).' },
  { symbol: '<<', name: 'Left Shift', lang: 'JS', desc: 'Shifts bits left, fills with zeros on right.' },
  { symbol: '>>', name: 'Right Shift', lang: 'JS', desc: 'Shifts bits right, preserves sign bit.' },
  { symbol: '>>>', name: 'Unsigned Right Shift', lang: 'JS', desc: 'Shifts bits right, fills with zeros on left.' },
  // JS Comparison
  { symbol: '===', name: 'Strict Equality', lang: 'JS', desc: 'Checks value AND type. No type coercion.' },
  { symbol: '!==', name: 'Strict Inequality', lang: 'JS', desc: 'Returns true when value OR type differs.' },
  { symbol: '==', name: 'Loose Equality', lang: 'JS', desc: 'Type coercion applied before comparison. Avoid.' },
  { symbol: '!=', name: 'Loose Inequality', lang: 'JS', desc: 'Type coercion applied before comparison. Avoid.' },
  // JS Other
  { symbol: '...', name: 'Spread / Rest', lang: 'JS', desc: 'Spreads iterable into individual elements, or collects into array.' },
  { symbol: '=>', name: 'Arrow Function', lang: 'JS', desc: 'Concise function syntax. Inherits parent `this`.' },
  { symbol: '**', name: 'Exponentiation', lang: 'JS', desc: 'Raises left operand to power of right operand.' },
  { symbol: '%', name: 'Modulo / Remainder', lang: 'JS', desc: 'Returns remainder after division.' },
  // CSS
  { symbol: '>', name: 'Child Combinator', lang: 'CSS', desc: 'Selects elements that are direct children of a specified element.' },
  { symbol: '+', name: 'Adjacent Sibling', lang: 'CSS', desc: 'Selects element immediately after a specified sibling.' },
  { symbol: '~', name: 'General Sibling', lang: 'CSS', desc: 'Selects all siblings after a specified element.' },
  { symbol: '||', name: 'Column Combinator', lang: 'CSS', desc: 'Selects cells in a column (CSS grid columns).' },
  { symbol: '::', name: 'Pseudo-element', lang: 'CSS', desc: 'Styles a specific part of an element (::before, ::after, etc).' },
  { symbol: ':', name: 'Pseudo-class', lang: 'CSS', desc: 'Selects elements in specific states (:hover, :focus, :nth-child).' },
  // TypeScript
  { symbol: '!', name: 'Non-null Assertion', lang: 'TS', desc: 'Tells TypeScript a value is definitely not null/undefined.' },
  { symbol: '?', name: 'Optional Property', lang: 'TS', desc: 'Marks a property as optional in a type or interface.' },
  { symbol: '&', name: 'Intersection Type', lang: 'TS', desc: 'Combines multiple types into one requiring all properties.' },
  { symbol: '|', name: 'Union Type', lang: 'TS', desc: 'Allows a value to be one of several types.' },
  { symbol: 'as', name: 'Type Assertion', lang: 'TS', desc: 'Overrides TypeScript\'s inferred type. Use with care.' },
  { symbol: 'keyof', name: 'Key Of', lang: 'TS', desc: 'Creates a union type of all keys of an object type.' },
  { symbol: 'typeof', name: 'Type Of', lang: 'TS', desc: 'Gets the TypeScript type of a value or variable.' },
];

const LANGS = ['All', 'JS', 'CSS', 'TS'];

export default function OperatorLookup() {
  const [query, setQuery] = useState('');
  const [lang, setLang] = useState('All');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return OPERATORS.filter(op => {
      const matchLang = lang === 'All' || op.lang === lang;
      const matchQuery = !q || op.symbol.toLowerCase().includes(q) || op.name.toLowerCase().includes(q) || op.desc.toLowerCase().includes(q);
      return matchLang && matchQuery;
    });
  }, [query, lang]);

  return (
    <div className={styles.tool}>
      <h1 className={styles.title}>Operator Lookup</h1>
      <p className={styles.desc}>Quick reference for JS, CSS & TypeScript operators.</p>

      <input
        type="text"
        placeholder="Search operators, e.g. ?? or spread..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className={styles.searchBar}
        spellCheck={false}
      />

      <div className={styles.filterTabs}>
        {LANGS.map(l => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className={`${styles.filterTab} ${lang === l ? styles.filterTabActive : ''}`}
          >
            {l}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No operators found. Try a different search.</p>
      ) : (
        <div className={styles.operatorGrid}>
          {filtered.map(op => (
            <div key={`${op.lang}-${op.symbol}`} className={styles.operatorCard}>
              <div className={styles.opSymbol}>{op.symbol}</div>
              <div className={styles.opName}>{op.lang} — {op.name}</div>
              <div className={styles.opDesc}>{op.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
