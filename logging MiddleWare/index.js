const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const LOGGING_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";

const STACKS = ["backend", "frontend"];
const LEVELS = ["debug", "info", "warn", "error", "fatal"];

const BACKEND_ONLY = [
  "cache", "controller", "cron_job", "db", "domain",
  "handler", "repository", "route", "service"
];

const FRONTEND_ONLY = [
  "api", "component", "hook", "page", "state", "style"
];

const SHARED_PACKAGES = ["auth", "config", "middleware", "utils"];

function isValidCombo(stack, pkg) {
  if (SHARED_PACKAGES.includes(pkg)) return true;
  if (stack === "backend") return BACKEND_ONLY.includes(pkg);
  if (stack === "frontend") return FRONTEND_ONLY.includes(pkg);
  return false;
}

async function Log(stack, level, packageName, message) {
  stack = stack.toLowerCase();
  level = level.toLowerCase();
  packageName = packageName.toLowerCase();

  if (!STACKS.includes(stack)) return;
  if (!LEVELS.includes(level)) return;
  if (!isValidCombo(stack, packageName)) return;

  const payload = { stack, level, package: packageName, message };

  try {
    await fetch(LOGGING_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // no console.log allowed
  }
}

module.exports = { Log };