const Mustache = require("mustache");
const es = require("../../locales/es.json");

class HttpError extends Error {
  constructor(name = "Internal Server Error", status = 500, params = {}) {
    super(name);

    this.name = name;
    this.status = status;
    this.params = params;
    this.message = {
      es: Mustache.render(es.errors[this.name] || "", params) || undefined,
    };
  }
}

module.exports = HttpError;
