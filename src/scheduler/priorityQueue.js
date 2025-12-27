class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  push(job) {
    this.heap.push(job);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return top;
  }

  peek() {
    return this.heap[0];
  }

  bubbleUp() {
    let i = this.heap.length - 1;
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.heap[p].nextRun <= this.heap[i].nextRun) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  bubbleDown() {
    let i = 0;
    while (true) {
      let l = 2 * i + 1;
      let r = 2 * i + 2;
      let smallest = i;

      if (l < this.heap.length && this.heap[l].nextRun < this.heap[smallest].nextRun)
        smallest = l;
      if (r < this.heap.length && this.heap[r].nextRun < this.heap[smallest].nextRun)
        smallest = r;

      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }

  size() {
    return this.heap.length;
  }

  // Remove a job by id. Returns true if removed.
  remove(id) {
    const idx = this.heap.findIndex(j => j.id === id);
    if (idx === -1) return false;
    if (idx === this.heap.length - 1) {
      this.heap.pop();
      return true;
    }
    this.heap[idx] = this.heap.pop();
    // try bubbling up or down to restore heap property
    this.bubbleUpIndex(idx);
    this.bubbleDownIndex(idx);
    return true;
  }

  // Update nextRun for a job; if job not found, push new
  update(id, nextRun) {
    const idx = this.heap.findIndex(j => j.id === id);
    if (idx === -1) {
      this.push({ id, nextRun });
      return;
    }
    this.heap[idx].nextRun = nextRun;
    this.bubbleUpIndex(idx);
    this.bubbleDownIndex(idx);
  }

  bubbleUpIndex(i) {
    let idx = i;
    while (idx > 0) {
      let p = Math.floor((idx - 1) / 2);
      if (this.heap[p].nextRun <= this.heap[idx].nextRun) break;
      [this.heap[p], this.heap[idx]] = [this.heap[idx], this.heap[p]];
      idx = p;
    }
  }

  bubbleDownIndex(i) {
    let idx = i;
    while (true) {
      let l = 2 * idx + 1;
      let r = 2 * idx + 2;
      let smallest = idx;

      if (l < this.heap.length && this.heap[l].nextRun < this.heap[smallest].nextRun)
        smallest = l;
      if (r < this.heap.length && this.heap[r].nextRun < this.heap[smallest].nextRun)
        smallest = r;

      if (smallest === idx) break;
      [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
      idx = smallest;
    }
  }
}

module.exports = PriorityQueue;
