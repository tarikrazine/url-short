CREATE TABLE IF NOT EXISTS "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
