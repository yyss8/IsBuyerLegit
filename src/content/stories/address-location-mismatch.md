---
title: When the address or location signals don't add up
description: Non-residential addresses, impossible addresses, and mismatched location signals are usually stop-and-verify triggers, not proof by themselves.
type: Address / location mismatch
category: Address / location mismatch
platform: ebay
outcome: safe
outcomeLabel: Avoided risk
result: avoided
date: 2026-03-06
redFlags:
  - Address does not exist or the street is not in that city
  - Street View shows a vacant lot, warehouse, non-residence, or closed business
  - Address is a known freight forwarder
  - Phone area code, order IP location, and shipping address point to different places
  - Zero-feedback buyer plus a high-value item
  - Request to redirect to one of these addresses after payment
sources:
  - title: HotHardware eBay GPU shipping-scam report
    url: https://hothardware.com/news/if-youre-selling-gpus-ebay-beware-shipping-scam
  - title: eBay Community fake-address thread
    url: https://community.ebay.com/t5/Shipping/Buyer-provided-fake-address-zero-feedback-possible-scam/td-p/32504386
  - title: Collectors Universe eBay return-scam thread
    url: https://forums.collectors.com/discussion/1118412/new-ebay-return-scam-uncovered
draft: false
# OWNER: confirm this matches your experience; rewrite in your voice.
whatToDo: |-
  Before shipping anything high-value, check the address on a map and Street View. Is it a real home, a normal business address, a forwarder, a vacant lot, or an impossible street?

  Treat impossible addresses, closed businesses, vacant lots, and freight forwarders as stop-and-verify signals. A single odd signal, like an out-of-state phone area code, can be innocent; several stacking together is different.

  Only ever ship to the original eBay order address. Never redirect to an address supplied after payment; if the buyer needs a different address, use the cancel-and-rebuy path instead.
---

Address and location signals are not proof by themselves. People ship to workplaces, forwarding services, family members, and old saved addresses all the time.

The warning is when the signals stop lining up: the address is impossible, Street View shows something that cannot reasonably receive the item, or the buyer asks you to redirect after payment. For the post-payment version, compare this with the <a href="/stories/address-change-after-payment/">address-change after payment story</a>.

In one avoided case, a seller sold a high-value graphics card on eBay and then received multiple messages from accounts pretending to be the buyer. The messages asked the seller to change the shipping address; one destination was a Delaware freight-forwarding facility that appeared in scam discussions, and another mapped to a custom-machining business that Google showed as permanently closed. The seller refused because shipping anywhere except the order address would risk seller protection.

In another avoided case, a zero-feedback buyer bought a $1,500 item. Before shipping, the seller checked the official address and found that the street did not exist in that city; after being contacted, the buyer supplied a different address. The seller contacted eBay, cancelled and refunded, then blocked the buyer. The address could have been a mistake, but the safe move was to cancel instead of improvising.

The supporting loss case shows why location signals matter even when the main scam pattern is something else. A seller dealing with a return-label swap also noticed that the purchase address was a Delaware forwarder, the phone number used a California area code, and the return entered the mail system in California. Those signals did not prove the scam alone, but they helped explain why the story did not add up.

For sellers taking cards directly, the same location mismatch pattern can matter in a different way. A shipping address far from the order's IP location, or an address tied to an import or forwarding company, can be a chargeback warning; without marketplace protection, the seller may carry that loss directly.
