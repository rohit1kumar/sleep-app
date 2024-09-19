import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar, text, time } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    nickname: varchar('nickname', { length: 256 }).notNull(),
    password: varchar('password', { length: 256 }).notNull(),
}, (users) => {
    return {
        nicknameUniqueIndex: uniqueIndex('nickname_unique_idx').on(users.nickname),
    }
});

export const goals = pgTable('goals', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 512 }).notNull(),
    description: text('description').notNull(),
});

export const struggleDurationEnum = pgEnum('struggle_duration', ['less_than_2_weeks', '2_to_8_weeks', 'more_than_8_weeks']);

export const sleepRecords = pgTable('sleep_records', {
    id: serial('id').primaryKey(),
    struggle_duration: struggleDurationEnum('struggle_duration').notNull(),
    bed_time: time('bed_time').notNull(),
    wakeup_time: time('wake_time').notNull(),
    sleep_duration: integer('sleep_duration').notNull(),
    sleep_efficiency: integer('sleep_efficiency'),
    user_id: integer('user_id').references(() => users.id),
    goal_id: integer('goal_id').references(() => goals.id)
});
