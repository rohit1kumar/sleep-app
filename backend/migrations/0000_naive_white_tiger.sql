DO $$ BEGIN
 CREATE TYPE "public"."struggle_duration" AS ENUM('less_than_2_weeks', '2_to_8_weeks', 'more_than_8_weeks');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "goals" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(512) NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sleep_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"struggle_duration" "struggle_duration" NOT NULL,
	"bed_time" time NOT NULL,
	"wake_time" time NOT NULL,
	"sleep_duration" integer NOT NULL,
	"sleep_efficiency" integer,
	"user_id" integer,
	"goal_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"nickname" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sleep_records" ADD CONSTRAINT "sleep_records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sleep_records" ADD CONSTRAINT "sleep_records_goal_id_goals_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "nickname_unique_idx" ON "users" USING btree ("nickname");