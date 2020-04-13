import { shallowMount } from "@vue/test-utils";
import Header from "@/components/NewsHeader.vue";

xdescribe("NewsHeader.vue", () => {
  it("can toggle menu", () => {
    const openMenu = false;
    const wrapper = shallowMount(Header, {
      propsData: { openMenu }
    });

    wrapper.trigger("toggleMenu");

    expect(wrapper.props("openMenu")).toEqual(!openMenu);
  });
});
