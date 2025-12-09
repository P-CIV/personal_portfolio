import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { portfolioData } from '../../data/portfolio';
import { Badge } from '../ui/badge';
import { Github, ArrowUpRight, ArrowRight } from 'lucide-react';
import type { Variants } from 'framer-motion';

interface ProjectCardProps {
  project: typeof portfolioData.projects[number];
  index: number;
  variants: Variants;
}

function getTechBadgeColor(techName: string): string {
  const name = techName.toLowerCase();

  if (name.includes('react') || name.includes('next.js')) return 'bg-blue-600/10 text-blue-400 border-blue-600/30';
  if (name.includes('tailwind') || name.includes('css')) return 'bg-cyan-600/10 text-cyan-400 border-cyan-600/30';
  if (name.includes('node') || name.includes('express')) return 'bg-green-600/10 text-green-400 border-green-600/30';
  if (name.includes('typescript') || name.includes('javascript')) return 'bg-yellow-600/10 text-yellow-400 border-yellow-600/30';
  if (name.includes('mongodb') || name.includes('sql')) return 'bg-lime-600/10 text-lime-400 border-lime-600/30';
  if (name.includes('framer') || name.includes('motion')) return 'bg-pink-600/10 text-pink-400 border-pink-600/30';
  if (name.includes('redux') || name.includes('zustand')) return 'bg-purple-600/10 text-purple-400 border-purple-600/30';

  return 'bg-secondary text-secondary-foreground border-secondary';
}

function ProjectCard({ project, index, variants }: ProjectCardProps) {
  const { t } = useLanguage();

  return (
    <motion.article
      variants={variants}
      whileHover={{ y: -5 }}
      className="group relative w-full"
    >
      <div className="flex flex-col md:flex-row h-full rounded-2xl overflow-hidden bg-card shadow-lg dark:shadow-xl dark:shadow-primary/5 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 border border-border/50 hover:border-primary/50">
        <div className="relative w-full md:w-1/3 aspect-video overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-muted">
              <span className="font-display text-4xl font-bold text-gray-400 dark:text-gray-600">
                {project.name.substring(0, 1)}
              </span>
            </div>
          )}

          <div className="absolute top-4 left-4 z-10">
            <span className="font-display text-4xl font-bold text-background/80 dark:text-foreground/20">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8 w-full md:w-2/3 flex flex-col justify-between flex-grow">
          {/* Header */}
          <div>
            {project.featured && (
              <div className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                {t({ en: 'Featured Project', fr: 'Projet Vedette' })}
              </div>
            )}

            <h3 className="font-display text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
              {project.name}
            </h3>

            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              {t(project.description)}
            </p>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech: string) => (
                <Badge
                  key={tech}
                  className={`text-xs font-medium ${getTechBadgeColor(tech)} border`}
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
                >
                  <span>{t({ en: 'View Project', fr: 'Voir le Projet' })}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>{t({ en: 'Code', fr: 'Code' })}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const { projects } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      {/* Décoration Arrière-plan */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* Titre Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t({ en: 'My Work', fr: 'Mes Réalisations' })}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              {t({ en: 'Featured', fr: 'Projets' })}{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {t({ en: 'Projects', fr: 'Vedettes' })}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t({
                en: 'A selection of my recent projects showcasing my skills and experience',
                fr: 'Une sélection de mes projets récents mettant en avant mes compétences et mon expérience'
              })}
            </p>
          </motion.div>

          {/* Grille Projets */}
          <div className="space-y-8">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
                variants={itemVariants}
              />
            ))}
          </div>

          {/* Bouton Voir Tous */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <a
              href="/all-projects"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              {t({ en: 'View All Projects', fr: 'Voir Tous mes Projets' })}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
