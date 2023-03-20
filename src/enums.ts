export const enum ApplicationCommandOptionType {
	SUB_COMMAND = 1,
	SUB_COMMAND_GROUP = 2,
	STRING = 3,
	INTEGER = 4,
	BOOLEAN = 5,
	USER = 6,
	CHANNEL = 7,
	ROLE = 8,
	MENTIONABLE = 9,
	NUMBER = 10,
	ATTACHMENT = 11,
};

export enum ChannelType {
	GUILD_TEXT = 0, // a text channel within a server
	DM = 1, // a direct message between users
	GUILD_VOICE = 2, // a voice channel within a server
	GROUP_DM = 3, // a direct message between multiple users
	GUILD_CATEGORY = 4, // an organizational category that contains up to 50 channels
	GUILD_ANNOUNCEMENT = 5, // a channel that users can follow and crosspost into their own server (formerly news channels)
	ANNOUNCEMENT_THREAD = 10, // a temporary sub-channel within a GUILD_ANNOUNCEMENT channel
	PUBLIC_THREAD = 11, // a temporary sub-channel within a GUILD_TEXT or GUILD_FORUM channel
	PRIVATE_THREAD = 12, // a temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission
	GUILD_STAGE_VOICE = 13, // a voice channel for hosting events with an audience
	GUILD_DIRECTORY = 14, // the channel in a hub containing the listed servers
	GUILD_FORUM = 15, // Channel that can only contain threads
};
