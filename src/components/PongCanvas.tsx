import { useEffect, useRef } from "react";

const W = 800;
const H = 500;
const PADDLE_W = 12;
const PADDLE_H = 80;
const BALL_R = 8;
const PADDLE_SPEED = 3.5;
const BALL_SPEED = 4.5;
/** How far the paddle lags behind the ball (0 = perfect, higher = more misses) */
const AI_LAG = 0.045;

interface GameState {
  ball: { x: number; y: number; vx: number; vy: number };
  p1: { y: number };
  p2: { y: number };
}

interface Props {
  onScore: (p1: number, p2: number) => void;
}

function randomAngle(): { vx: number; vy: number } {
  const angle = (Math.random() * Math.PI) / 3 - Math.PI / 6; // -30° to +30°
  const dir = Math.random() < 0.5 ? 1 : -1;
  return { vx: BALL_SPEED * dir * Math.cos(angle), vy: BALL_SPEED * Math.sin(angle) };
}

export default function PongCanvas({ onScore }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const score = useRef({ p1: 0, p2: 0 });
  const state = useRef<GameState>({
    ball: { x: W / 2, y: H / 2, ...randomAngle() },
    p1: { y: H / 2 - PADDLE_H / 2 },
    p2: { y: H / 2 - PADDLE_H / 2 },
  });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function resetBall() {
      state.current.ball = { x: W / 2, y: H / 2, ...randomAngle() };
    }

    function movePaddle(paddleY: number, targetY: number): number {
      const center = paddleY + PADDLE_H / 2;
      const diff = targetY - center;
      if (Math.abs(diff) < PADDLE_SPEED) return paddleY;
      return paddleY + (diff > 0 ? PADDLE_SPEED : -PADDLE_SPEED);
    }

    function clampPaddle(y: number): number {
      return Math.max(0, Math.min(H - PADDLE_H, y));
    }

    function draw() {
      const { ball, p1, p2 } = state.current;

      // Background
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, W, H);

      // Centre dashed line
      ctx.setLineDash([8, 8]);
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(W / 2, 0);
      ctx.lineTo(W / 2, H);
      ctx.stroke();
      ctx.setLineDash([]);

      // Paddles
      ctx.fillStyle = "#f8fafc";
      ctx.beginPath();
      ctx.roundRect(8, p1.y, PADDLE_W, PADDLE_H, 4);
      ctx.fill();

      ctx.beginPath();
      ctx.roundRect(W - 8 - PADDLE_W, p2.y, PADDLE_W, PADDLE_H, 4);
      ctx.fill();

      // Ball
      ctx.fillStyle = "#f8fafc";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2);
      ctx.fill();
    }

    function update() {
      const s = state.current;

      // Move paddles toward ball with lag
      const targetY = s.ball.y - PADDLE_H / 2 + (Math.random() - 0.5) * PADDLE_H * AI_LAG * 20;
      s.p1.y = clampPaddle(movePaddle(s.p1.y, targetY));
      s.p2.y = clampPaddle(movePaddle(s.p2.y, targetY));

      // Move ball
      s.ball.x += s.ball.vx;
      s.ball.y += s.ball.vy;

      // Top / bottom bounce
      if (s.ball.y - BALL_R <= 0) {
        s.ball.y = BALL_R;
        s.ball.vy *= -1;
      }
      if (s.ball.y + BALL_R >= H) {
        s.ball.y = H - BALL_R;
        s.ball.vy *= -1;
      }

      // Paddle 1 (left) collision
      const p1x = 8 + PADDLE_W;
      if (
        s.ball.vx < 0 &&
        s.ball.x - BALL_R <= p1x &&
        s.ball.y >= s.p1.y &&
        s.ball.y <= s.p1.y + PADDLE_H
      ) {
        s.ball.x = p1x + BALL_R;
        const relHit = (s.ball.y - (s.p1.y + PADDLE_H / 2)) / (PADDLE_H / 2);
        const angle = relHit * (Math.PI / 3);
        s.ball.vx = BALL_SPEED * Math.cos(angle);
        s.ball.vy = BALL_SPEED * Math.sin(angle);
      }

      // Paddle 2 (right) collision
      const p2x = W - 8 - PADDLE_W;
      if (
        s.ball.vx > 0 &&
        s.ball.x + BALL_R >= p2x &&
        s.ball.y >= s.p2.y &&
        s.ball.y <= s.p2.y + PADDLE_H
      ) {
        s.ball.x = p2x - BALL_R;
        const relHit = (s.ball.y - (s.p2.y + PADDLE_H / 2)) / (PADDLE_H / 2);
        const angle = relHit * (Math.PI / 3);
        s.ball.vx = -BALL_SPEED * Math.cos(angle);
        s.ball.vy = BALL_SPEED * Math.sin(angle);
      }

      // Scoring
      if (s.ball.x + BALL_R < 0) {
        score.current.p2 += 1;
        onScore(score.current.p1, score.current.p2);
        resetBall();
      }
      if (s.ball.x - BALL_R > W) {
        score.current.p1 += 1;
        onScore(score.current.p1, score.current.p2);
        resetBall();
      }
    }

    function loop() {
      update();
      draw();
      raf.current = requestAnimationFrame(loop);
    }

    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [onScore]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className="rounded-xl w-full max-w-3xl"
      style={{ aspectRatio: `${W}/${H}` }}
    />
  );
}
