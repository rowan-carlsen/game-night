import house from '#lib/assets/images/scary-house-3.jpg';
import motelSign from '#lib/assets/images/motel-sign4.jpg';
import spacesuit from '#lib/assets/images/spacesuit-edit.jpg';
import modelT from '#lib/assets/images/modelt-2.png';

export const scenarios = [
	{
		title: 'Forget Me Not',
		setting: "2010's",
		description:
			'Battered, bruised, and missing their memories, a group of outsiders must piece together what happened to them in a rural American town.',
		image: motelSign
	},
	{
		title: 'Music From a Darkened Room',
		setting: "1990's",
		description:
			"An unassuming house on a quiet suburban street has a chilling history. A clandestine government agency needs to uncover the house's true nature after it claims one of their own.",
		image: house
	},
	{
		title: 'Operation Minoan Augur',
		setting: "1990's",
		description:
			'A bizarre murder. A fugitive in a spacesuit. Detectives race against time to uncover secrets never revealed to the public.',
		image: spacesuit
	},
	{
		title: 'Dead Light',
		setting: "1920's",
		description:
			'Along an isolated country road on a stormy night, a near accident leads to the discovery of a deadly secret.',
		image: modelT
	}
];
