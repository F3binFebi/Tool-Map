import { Tool } from '../types';
import { AI_TOOLS } from './toolsAI';
import { SOFTWARE_TOOLS } from './toolsSoftware';

/**
 * ToolWise Comprehensive Tool Database
 * 90 real, verified AI & Software tools with complete structured specifications.
 */
export const TOOLS_DATA: Tool[] = [
  ...AI_TOOLS,
  ...SOFTWARE_TOOLS
];
