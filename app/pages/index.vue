<script lang="ts" setup></script>

<template>
  <div>
    <SectionHero />
    <UIDivider />
    <SectionNews />
    <div
      class="bg-amber-950 h-svh overflow-hidden box-content flex items-center justify-center"
    >
      <video
        autoplay
        muted
        loop
        class="object-cover w-full h-full brightness-60 blur-[2px] select-none"
      >
        <source
          src="/videos/caves.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  </div>
</template>
