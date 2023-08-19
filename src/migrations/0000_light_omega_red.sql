CREATE TABLE IF NOT EXISTS "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"short" varchar(200),
	"author_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" text NOT NULL,
	"password" varchar(75) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "visits" (
	"id" serial PRIMARY KEY NOT NULL,
	"link_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "url_idx" ON "links" ("url");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "username_idx" ON "users" ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "links" ADD CONSTRAINT "links_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "visits" ADD CONSTRAINT "visits_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
