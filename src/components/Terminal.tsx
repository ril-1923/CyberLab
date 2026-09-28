import { useEffect, useState } from 'react';

interface TerminalProps {
  lines: string[];
  autoPlay?: boolean;
  speed?: number;
  className?: string;
}

export function Terminal({ lines, autoPlay = true, speed = 80, className = '' }: TerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>(autoPlay ? [] : lines);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (!autoPlay) {
      setDisplayedLines(lines);
      return;
    }
    setDisplayedLines([]);
    setCurrentLine(0);
  }, [lines, autoPlay]);

  useEffect(() => {
    if (!autoPlay || currentLine >= lines.length) return;
    const timer = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, lines[currentLine]]);
      setCurrentLine((prev) => prev + 1);
    }, speed);
    return () => clearTimeout(timer);
  }, [currentLine, lines, autoPlay, speed]);

  return (
    <div className={`cyber-terminal ${className}`}>
      <div className="cyber-terminal-header">
        <span className="cyber-terminal-dot red"></span>
        <span className="cyber-terminal-dot yellow"></span>
        <span className="cyber-terminal-dot green"></span>
        <span className="cyber-text-muted ms-2" style={{ fontSize: '0.78rem' }}>cyberlab@terminal</span>
      </div>
      <div className="cyber-terminal-body">
        {displayedLines.map((line, i) => {
          const isPrompt = line.startsWith('$');
          const isOutput = line.startsWith('[');
          const isError = line.includes('ERROR') || line.includes('WARNING') || line.includes('!');
          return (
            <div key={i} className="cyber-terminal-line">
              {isPrompt ? (
                <><span className="cyber-terminal-prompt">{line.split(' ')[0]}</span> <span className="cyber-terminal-output">{line.substring(line.indexOf(' ') + 1)}</span></>
              ) : isOutput ? (
                <span className={isError ? 'cyber-terminal-error' : 'cyber-terminal-success'}>{line}</span>
              ) : (
                <span className="cyber-terminal-output">{line}</span>
              )}
            </div>
          );
        })}
        {autoPlay && currentLine < lines.length && <span className="cyber-cursor"></span>}
      </div>
    </div>
  );
}
