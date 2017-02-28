import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

if ('prod' === ENV) {
  // Production
} else {
  // Development

  (Error as any).stackTraceLimit = Infinity;

  (require as any)('zone.js/dist/long-stack-trace-zone');
}
