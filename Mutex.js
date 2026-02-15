'use server'
const INDEX = 0
const UNLOCKED = 0
const LOCKED = 1

class Mutex {
  constructor(sharedArrayBuffer) {
    this.arrayView = new Int32Array(sharedArrayBuffer)
  }

  lock() {
    while (true) {
      const oldValue = Atomics.compareExchange(
        this.arrayView,
        INDEX,
        UNLOCKED,
        LOCKED
      )

      if (oldValue === UNLOCKED) {
        return
      }

      Atomics.wait(this.arrayView, INDEX, LOCKED)
    }
  }

  unlock() {
    const oldValue = Atomics.compareExchange(
      this.arrayView,
      INDEX,
      LOCKED,
      UNLOCKED
    )

    if (oldValue === UNLOCKED) {
      throw new Error('Mutex уже был разблокирован!')
    }
    Atomics.notify(this.arrayView, INDEX, 1)
  }

  executeLocked(callback) {
    const tryGetLock = async () => {
      while (true) {
        const oldValue = Atomics.compareExchange(
          this.arrayView,
          INDEX,
          UNLOCKED,
          LOCKED
        );

        if (oldValue === UNLOCKED) {
          callback();
          this.unlock()

          return
        }

        const result = Atomics.waitAsync(this.arrayView, INDEX, LOCKED)

        await result.value
      }
    }

    tryGetLock()
  }
}

export default Mutex