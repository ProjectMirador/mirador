/** */
export default class TruncatedHit {
  /** */
  constructor(hit, maxChars = 200, minimum = 20) {
    this.hit = hit;
    this.maxChars = maxChars;
    this.minimum = minimum;
  }

  /** */
  get charsOnSide() {
    const resultingChars = (this.maxChars - this.hit.match.length) / 2;
    const measured = [(this.hit.before || '').length, (this.hit.after || '').length].filter(length => length > 0);
    return Math.max(Math.min(resultingChars, ...measured), this.minimum);
  }

  /** */
  get before() {
    if (!this.hit.before) return '';
    return this.hit.before.substring(
      this.hit.before.length - this.charsOnSide, this.hit.before.length,
    );
  }

  /** */
  get match() {
    return this.hit.match;
  }

  /** */
  get after() {
    if (!this.hit.after) return '';
    return this.hit.after.substring(
      0, Math.min(this.hit.after.length, this.charsOnSide),
    );
  }
}
