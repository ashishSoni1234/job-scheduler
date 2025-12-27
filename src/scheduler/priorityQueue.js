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
}

module.exports = PriorityQueue;
