// High Performance Canvas Candlestick & Volume Chart Component

export class CandlestickChart {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.candles = [];
    this.timeframe = options.timeframe || '15m';
    this.crosshair = null;
    this.isHovering = false;

    this.setupEvents();
    this.handleResize();
  }

  handleResize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width || 360;
    this.height = Math.max(260, rect.height || 280);

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
    this.render();
  }

  setData(candles, assetSymbol = '') {
    this.candles = candles || [];
    this.assetSymbol = assetSymbol;
    this.render();
  }

  setupEvents() {
    window.addEventListener('resize', () => this.handleResize());

    const updateCrosshair = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      this.crosshair = { x, y };
      this.isHovering = true;
      this.render();
    };

    this.canvas.addEventListener('mousemove', (e) => updateCrosshair(e.clientX, e.clientY));
    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        updateCrosshair(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    this.canvas.addEventListener('mouseleave', () => {
      this.isHovering = false;
      this.crosshair = null;
      this.render();
    });
    this.canvas.addEventListener('touchend', () => {
      this.isHovering = false;
      this.crosshair = null;
      this.render();
    });
  }

  render() {
    const { ctx, width, height, candles } = this;
    if (!ctx || !candles || candles.length === 0) return;

    ctx.clearRect(0, 0, width, height);

    // Dark sleek background
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, width, height);

    const padding = { top: 30, right: 65, bottom: 45, left: 10 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = (height - padding.top - padding.bottom) * 0.75;
    const volumeHeight = (height - padding.top - padding.bottom) * 0.22;
    const volumeTop = padding.top + chartHeight + 10;

    // Determine min/max price
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    let maxVolume = 0;

    candles.forEach(c => {
      if (c.low < minPrice) minPrice = c.low;
      if (c.high > maxPrice) maxPrice = c.high;
      if (c.volume > maxVolume) maxVolume = c.volume;
    });

    const priceRange = (maxPrice - minPrice) || 1;
    // 5% margin
    minPrice -= priceRange * 0.05;
    maxPrice += priceRange * 0.05;
    const effectiveRange = maxPrice - minPrice;

    // Grid lines (Horizontal)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    const gridSteps = 4;
    ctx.fillStyle = '#94A3B8';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';

    for (let i = 0; i <= gridSteps; i++) {
      const y = padding.top + (chartHeight * (i / gridSteps));
      const price = maxPrice - (effectiveRange * (i / gridSteps));

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillText(price.toFixed(price > 100 ? 2 : 4), width - padding.right + 8, y + 4);
    }

    // Candle widths
    const candleWidth = Math.max(3, (chartWidth / candles.length) * 0.7);
    const spacing = chartWidth / candles.length;

    // Calculate EMA 20
    const emaPoints = [];
    let k = 2 / (20 + 1);
    let ema = candles[0].close;

    candles.forEach((c, i) => {
      if (i > 0) ema = (c.close * k) + (ema * (1 - k));
      const x = padding.left + (i * spacing) + (spacing / 2);
      const y = padding.top + chartHeight - ((ema - minPrice) / effectiveRange) * chartHeight;
      emaPoints.push({ x, y });
    });

    // Draw Candles & Volume
    let hoveredCandle = null;
    candles.forEach((c, i) => {
      const x = padding.left + (i * spacing) + (spacing / 2);
      const isUp = c.close >= c.open;
      const color = isUp ? '#00E676' : '#FF3D57';

      const highY = padding.top + chartHeight - ((c.high - minPrice) / effectiveRange) * chartHeight;
      const lowY = padding.top + chartHeight - ((c.low - minPrice) / effectiveRange) * chartHeight;
      const openY = padding.top + chartHeight - ((c.open - minPrice) / effectiveRange) * chartHeight;
      const closeY = padding.top + chartHeight - ((c.close - minPrice) / effectiveRange) * chartHeight;

      // Check hover
      if (this.crosshair && Math.abs(this.crosshair.x - x) < spacing / 2) {
        hoveredCandle = { candle: c, x, y: closeY };
      }

      // High-Low Wick
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      // Body
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.max(2, Math.abs(closeY - openY));

      ctx.fillStyle = color;
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);

      // Volume bar
      const volBarHeight = (c.volume / (maxVolume || 1)) * volumeHeight;
      const volY = volumeTop + volumeHeight - volBarHeight;
      ctx.fillStyle = isUp ? 'rgba(0, 230, 118, 0.35)' : 'rgba(255, 61, 87, 0.35)';
      ctx.fillRect(x - candleWidth / 2, volY, candleWidth, volBarHeight);
    });

    // Draw EMA 20 line
    if (emaPoints.length > 1) {
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(emaPoints[0].x, emaPoints[0].y);
      for (let i = 1; i < emaPoints.length; i++) {
        ctx.lineTo(emaPoints[i].x, emaPoints[i].y);
      }
      ctx.stroke();
    }

    // Legend
    ctx.fillStyle = '#38BDF8';
    ctx.fillText('EMA 20', padding.left + 8, padding.top - 12);
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('Volume', padding.left + 70, volumeTop - 2);

    // Crosshair & Tooltip
    if (this.crosshair && hoveredCandle) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.setLineDash([3, 3]);

      // Vertical line
      ctx.beginPath();
      ctx.moveTo(hoveredCandle.x, padding.top);
      ctx.lineTo(hoveredCandle.x, height - padding.bottom);
      ctx.stroke();

      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(padding.left, this.crosshair.y);
      ctx.lineTo(width - padding.right, this.crosshair.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Tooltip Card at top
      const c = hoveredCandle.candle;
      const isUp = c.close >= c.open;
      const tooltipText = `O: ${c.open.toFixed(2)}  H: ${c.high.toFixed(2)}  L: ${c.low.toFixed(2)}  C: ${c.close.toFixed(2)}`;
      
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(padding.left + 5, 5, 260, 20);
      ctx.fillStyle = isUp ? '#00E676' : '#FF3D57';
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.fillText(tooltipText, padding.left + 10, 19);
    }
  }
}
