import { shallowMount } from "@vue/test-utils";
import Header from "@/components/header.vue";

describe("Header.vue", () => {
  it("can toggle menu", () => {
    const openMenu = false;
    const wrapper = shallowMount(Header, {
      propsData: { openMenu }
    });

    wrapper.trigger("toggleMenu");

    expect(wrapper.props("openMenu")).toEqual(!openMenu);
  });
});
