import React from 'react';
import { Github, ExternalLink, Code, Terminal } from 'lucide-react';
import {GitHubCalendar} from 'react-github-calendar';
import PageNavigation from '../components/PageNavigation';

const CodeGraph = () => {
  const githubUsername = "Abhinandan12317";
  const leetcodeUsername = "d2LDbjDxMO";

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-fade-in">
      <header className="mb-12 border-b border-border pb-6">
        <h1 className="text-3xl font-serif text-ink mb-2">Code Graph</h1>
        <p className="text-subtle font-sans max-w-xl leading-relaxed">
          Visualizing persistence and problem-solving velocity.
          <br />
          <span className="text-xs font-mono opacity-60">
            GET /activity/contributions
          </span>
        </p>
      </header>

      <div className="space-y-16">

        {/* ===================== GitHub Section ===================== */}
        <section className="animate-fade-in-up delay-100 group">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/5 rounded-full text-ink group-hover:bg-black/10 transition-colors">
                <Github size={20} />
              </div>
              <div>
                <h2 className="font-serif text-xl text-ink">Source Control</h2>
                <p className="text-xs font-mono text-subtle">
                  GitHub Contributions
                </p>
              </div>
            </div>
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-subtle hover:text-accent transition-colors"
            >
              <span>PROFILE_REF</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Calendar Heatmap */}
          <div className="bg-white border border-border p-6 md:p-10 rounded-sm shadow-sm hover:border-accent/30 transition-colors flex justify-center overflow-hidden">
            <GitHubCalendar
              username={githubUsername}
              blockSize={18}
              blockMargin={3}
              fontSize={12}
              colorScheme="light"
              theme={{
                light: [
                  "#ebedf0",
                  "#c6d4ee",
                  "#9bb6e4",
                  "#6b8fcf",
                  "#3A4F7A",
                ],
              }}
              renderBlock={(block, activity) => (
                React.cloneElement(
                  block,
                  {
                    style: {
                      ...(block.props && block.props.style ? block.props.style : {}),
                      cursor: activity ? 'pointer' : 'default',
                    },
                    title: activity ? `${activity.date}: ${activity.count} contributions` : ''
                  }
                )
              )}
            />
          </div>
        </section>

        {/* ===================== LeetCode Section ===================== */}
        <section className="animate-fade-in-up delay-200 group">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/5 rounded-full text-ink group-hover:bg-black/10 transition-colors">
                <Code size={20} />
              </div>
              <div>
                <h2 className="font-serif text-xl text-ink">
                  Algorithmic Velocity
                </h2>
                <p className="text-xs font-mono text-subtle">
                  LeetCode Heatmap
                </p>
              </div>
            </div>
            <a
              href={`https://leetcode.com/u/${leetcodeUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-subtle hover:text-accent transition-colors"
            >
              <span>PROFILE_REF</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="bg-white border border-border p-4 md:p-8 rounded-sm overflow-hidden shadow-sm hover:border-accent/30 transition-colors relative flex justify-center">
            <div className="w-[90%] flex justify-center overflow-hidden">
              <img
                src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?ext=heatmap&theme=light&font=Inter`}
                alt="LeetCode Activity Graph"
                className="max-w-full h-auto opacity-80 hover:opacity-100 transition-all duration-500 grayscale-[100%] contrast-125 hover:grayscale-0"
                loading="lazy"
              />
            </div>

            <div className="absolute top-2 right-2 flex gap-1">
              <div className="w-1 h-1 bg-subtle/20 rounded-full"></div>
              <div className="w-1 h-1 bg-subtle/20 rounded-full"></div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[10px] text-subtle font-mono border-l-2 border-accent/20 pl-3">
            <Terminal size={10} />
            <span>DATA_STREAM: CONTINUOUS</span>
          </div>
        </section>

      </div>

      <PageNavigation />
    </div>
  );
};

export default CodeGraph;
