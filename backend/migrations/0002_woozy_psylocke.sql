ALTER TABLE "sleep_records" DROP CONSTRAINT "sleep_records_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "sleep_records" DROP CONSTRAINT "sleep_records_goal_id_goals_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sleep_records" ADD CONSTRAINT "sleep_records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sleep_records" ADD CONSTRAINT "sleep_records_goal_id_goals_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goals"("id") ON DELETE CASCADE ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
