/**
 * Very small DI container for front‑end services (GRASP "Indirection").
 */
class Container {
  constructor() {
    this.providers = new Map();
  }

  register(key, provider) {
    this.providers.set(key, provider);
  }

  resolve(key) {
    const provider = this.providers.get(key);
    if (!provider) throw new Error(`No provider for ${key}`);
    return provider();
  }
}

export const container = new Container();
