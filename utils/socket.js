const safeEmit = (req, event, payload) => {
  try {
    const io = req?.app?.get?.('io');
    if (io && typeof io.emit === 'function') {
      io.emit(event, payload);
    }
  } catch (error) {
    console.log('Socket emit skipped:', error.message);
  }
};

module.exports = safeEmit;