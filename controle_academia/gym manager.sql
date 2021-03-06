CREATE TABLE `instructors` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` text,
  `avatar_url` text,
  `gender` text,
  `services` text,
  `birth` timestamp,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `members` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` text,
  `email` text,
  `avatar_url` text,
  `gender` text,
  `goals` text,
  `wheight` integer,
  `height` integer,
  `created_at` timestamp DEFAULT (now()),
  `instructor_id` integer
);
