import React, { Fragment } from "react";
import { useDispatch } from "react-redux/lib/hooks/useDispatch";
import { resetAscensions } from "../../redux/userData/ascensions";
import { resetPreferences } from "../../redux/userData/preferences";
import { ListingSection, Button, Checkbox } from "../Menu";

export default function Preferences() {
	const dispatch = useDispatch();

	return (
		<Fragment>
			<ListingSection title="General">
				<Checkbox name="autoClickCookie">Auto Click Cookie</Checkbox>
				<Button onClick={() => dispatch(resetPreferences())}>
					Reset Preferences to Default
				</Button>
				<Button onClick={() => dispatch(resetAscensions())}>
					Reset Ascensions to Default
				</Button>
			</ListingSection>

			<ListingSection title="Shimmers">
				<Checkbox name="autoClickShimmers">Auto Click Shimmers</Checkbox>

				<Checkbox name="autoClickReindeers">Auto Click Reindeers</Checkbox>

				<Checkbox name="autoClickWrathCookies">
					Auto Click Wrath Cookies
				</Checkbox>
			</ListingSection>

			<ListingSection title="News">
				<Checkbox name="autoClickNews">Auto Click News</Checkbox>
			</ListingSection>

			<ListingSection title="Cookie Monster Integration">
				<Checkbox name="autoBuyUpgrades">
					Auto Buy Upgrades (Prioritize low return on investment)
				</Checkbox>
				<Checkbox name="autoBuyBuildings">
					Auto Buy Buildings (Only green highlighted buildings)
				</Checkbox>
				<br />
				<p>Note: These features require Cookie Monster to work.</p>
			</ListingSection>
		</Fragment>
	);
}
