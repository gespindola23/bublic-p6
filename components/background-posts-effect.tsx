const posts = [
  { size: "w-48 h-64", top: "10%", left: "5%", duration: "40s", delay: "0s" },
  { size: "w-56 h-40", top: "20%", left: "80%", duration: "45s", delay: "-15s" },
  { size: "w-32 h-56", top: "70%", left: "90%", duration: "35s", delay: "-5s" },
  { size: "w-64 h-48", top: "80%", left: "15%", duration: "50s", delay: "-25s" },
  { size: "w-40 h-40", top: "50%", left: "50%", duration: "30s", delay: "-10s" },
  { size: "w-48 h-64", top: "5%", left: "30%", duration: "55s", delay: "-30s" },
]

export function BackgroundPostsEffect() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {posts.map((post, i) => (
        <div
          key={i}
          className={`absolute bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 animate-float-up ${post.size}`}
          style={{
            top: post.top,
            left: post.left,
            animationDuration: post.duration,
            animationDelay: post.delay,
          }}
        />
      ))}
    </div>
  )
}
